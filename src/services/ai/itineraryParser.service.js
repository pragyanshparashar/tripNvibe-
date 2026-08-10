function parseItineraryResponse(aiResponse) {
  if (!aiResponse) {
    throw new Error("AI response is empty");
  }

  let cleanedResponse = aiResponse.trim();

  // Remove markdown code blocks if Gemini adds them
  cleanedResponse = cleanedResponse.replace(/```json/gi, "");
  cleanedResponse = cleanedResponse.replace(/```/g, "");

  cleanedResponse = cleanedResponse.trim();

  let parsedResponse;

  try {
    parsedResponse = JSON.parse(cleanedResponse);
  } catch (error) {
    console.log("AI JSON parsing failed:", error.message);
    throw new Error("AI returned an invalid JSON response");
  }

  if (!parsedResponse.tripOptions) {
    throw new Error("AI response does not contain trip options");
  }

  if (!Array.isArray(parsedResponse.tripOptions)) {
    throw new Error("Trip options must be an array");
  }

  if (parsedResponse.tripOptions.length === 0) {
    throw new Error("AI did not generate any trip options");
  }

  return parsedResponse;
}

module.exports = parseItineraryResponse;