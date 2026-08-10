const getItineraryPrompt = require("../../prompts/itinerary.prompts");

function buildPrompt(tripDetails) {
  const masterPrompt = getItineraryPrompt();

  const userTripDetails = `
Destination: ${tripDetails.destination}

Trip Dates:
Start Date: ${tripDetails.tripDates.startDate}
End Date: ${tripDetails.tripDates.endDate}

Budget: ₹${tripDetails.budget}

Group Size: ${tripDetails.groupSize}

Vibe Type: ${tripDetails.vibeType}
`;

  const finalPrompt = `
${masterPrompt}

User Trip Details:

${userTripDetails}
`;

  return finalPrompt;
}

module.exports = buildPrompt;