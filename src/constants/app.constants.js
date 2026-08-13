const ROOM_STATUS = {
    PLANNING : 'planning' ,
    VOTING : 'voting' ,
    FINALIZED : 'finalized'
}

const GEMINI = {
    // Pinned deliberately, NOT an alias like `gemini-flash-latest`. Aliases move
    // between model generations without warning, and each generation has its own
    // free-tier quota bucket — the alias had drifted onto a model capped at
    // 20 requests/day, which is what made generation start failing constantly.
    MODEL : 'gemini-3.5-flash',

    // Tried when the primary model is rate-limited or errors. Separate quota
    // bucket, and roughly 3x faster at some cost to itinerary richness.
    FALLBACK_MODEL : 'gemini-3.5-flash-lite',

    // These are thinking models: reasoning tokens are drawn from the same output
    // budget as the response. The default budget is too small here, so the model
    // spends it thinking and returns empty text. Measured: ~2.1k thinking tokens
    // + ~4k response tokens for 4 itineraries.
    MAX_OUTPUT_TOKENS : 32768,

    // Number of itineraries per generation. Each one costs meaningful latency:
    // 10 options took ~122s, 4 options takes ~27s.
    TRIP_OPTION_COUNT : 4,

    // Per-attempt ceiling, not a total. Measured live latency for the primary
    // swings widely (13s, 46s, and one run past 90s), so this is set to give up
    // on a slow primary early rather than ride it out — the lite fallback
    // answers in under 10s, making fail-fast-then-retry the faster path.
    REQUEST_TIMEOUT_MS : 45000
}

module.exports = {ROOM_STATUS,GEMINI};
