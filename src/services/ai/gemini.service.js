const {GoogleGenAI} = require('@google/genai');
const env = require("../../config/env");
const {GEMINI} = require("../../constants/app.constants");
const ai = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY
})

// The SDK surfaces upstream failures as an Error whose message is the raw JSON
// error body. Pull the HTTP code out so callers can tell a quota problem (429)
// apart from a bad request or an outage.
function readErrorCode(error){
    const match = /"code"\s*:\s*(\d+)/.exec(error.message || "");
    return match ? Number(match[1]) : null;
}

async function callModel(model, prompt){
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            // Guarantees syntactically valid JSON, so the parser can no longer
            // fail on stray prose or markdown fences around the response.
            responseMimeType: 'application/json',
            maxOutputTokens: GEMINI.MAX_OUTPUT_TOKENS,
            // Without this a stalled upstream call holds the client's HTTP
            // connection open forever instead of failing.
            abortSignal: AbortSignal.timeout(GEMINI.REQUEST_TIMEOUT_MS)
        }
    })

    const text = response.text;

    // An aborted or truncated call can resolve with empty text instead of
    // throwing. Left alone that reaches the parser, which reports it as a
    // malformed AI response and skips the fallback entirely — observed live as
    // a 502 after 96s. Treat it as a failed attempt so the fallback runs.
    if (!text || !text.trim()) {
        const finishReason = response.candidates?.[0]?.finishReason;
        throw new Error(`Empty response from ${model} (finishReason: ${finishReason})`);
    }

    return text;
}

async function generateTripItinerary(prompt){
    try {
        return await callModel(GEMINI.MODEL, prompt);
    } catch (error){
        const code = readErrorCode(error);
        console.log(`GEMINI ERROR (${GEMINI.MODEL}, code ${code}):`, error.message);

        // A 400 means we sent something the model rejected — retrying on a
        // different model would fail identically, so surface it immediately.
        if (code === 400) {
            error.statusCode = 400;
            throw error;
        }

        try {
            console.log(`GEMINI: retrying on ${GEMINI.FALLBACK_MODEL}`);
            return await callModel(GEMINI.FALLBACK_MODEL, prompt);
        } catch (fallbackError){
            const fallbackCode = readErrorCode(fallbackError);
            console.log(`GEMINI ERROR (${GEMINI.FALLBACK_MODEL}, code ${fallbackCode}):`, fallbackError.message);

            if (fallbackCode === 429) {
                fallbackError.statusCode = 429;
                fallbackError.clientMessage =
                    "Our AI planner has hit its request limit for now. Please try again in a minute.";
            } else {
                fallbackError.statusCode = 502;
                fallbackError.clientMessage =
                    "Our AI planner is temporarily unavailable. Please try again.";
            }

            throw fallbackError;
        }
    }
}

module.exports = generateTripItinerary;
