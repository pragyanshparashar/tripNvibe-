const {GoogleGenAI} = require('@google/genai');
const env = require("../../config/env");
const {GEMINI} = require("../../constants/app.constants");
const ai = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY
})

async function generateTripItinerary(prompt){
    try {
        const response = await ai.models.generateContent({
            model: GEMINI.MODEL,
            contents: prompt
        })

        return response.text;
    } catch (error){
        console.log('GEMINI ERROR:', error.message);
        throw error;
    }
}

module.exports = generateTripItinerary;