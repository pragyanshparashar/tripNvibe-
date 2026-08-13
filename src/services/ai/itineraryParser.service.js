// The AI produced something we could not use. Distinct from "the AI was
// unreachable", so it gets its own status and a message safe to show a user.
function badAIResponse(reason) {
  const error = new Error(reason);
  error.statusCode = 502;
  error.clientMessage =
    "Our AI planner returned an unexpected response. Please try again.";
  return error;
}

function parseItineraryResponse(aiResponse) {
  if (!aiResponse) {
    throw badAIResponse("AI response is empty");
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
    throw badAIResponse("AI returned an invalid JSON response");
  }

  if (!parsedResponse.tripOptions) {
    throw badAIResponse("AI response does not contain trip options");
  }

  if (!Array.isArray(parsedResponse.tripOptions)) {
    throw badAIResponse("Trip options must be an array");
  }

  if (parsedResponse.tripOptions.length === 0) {
    throw badAIResponse("AI did not generate any trip options");
  }

  return parsedResponse;
}

module.exports = parseItineraryResponse;