const buildPrompt = require("../services/ai/promptBuilder.service");
const generateTripItinerary = require("../services/ai/gemini.service");
const parseItineraryResponse = require("../services/ai/itineraryParser.service");
const validateBudget = require("../services/ai/budgetValidator.service");

const {
  successResponse
} = require("../utils/responseHandler");

async function generateTrip(req, res, next) {
  try {
    const {
      destination,
      tripDates,
      budget,
      groupSize,
      vibeType
    } = req.body;

    if (
      !destination ||
      !tripDates ||
      !tripDates.startDate ||
      !tripDates.endDate ||
      !budget ||
      !groupSize ||
      !vibeType
    ) {
      return res.status(400).json({
        success: false,
        message: "All trip details are required"
      });
    }

    const tripDetails = {
      destination,
      tripDates,
      budget,
      groupSize,
      vibeType
    };

    // Step 1: Build Gemini prompt
    const prompt = buildPrompt(tripDetails);

    // Step 2: Send prompt to Gemini
    const aiResponse = await generateTripItinerary(prompt);

    // Step 3: Parse Gemini response
    const parsedResponse = parseItineraryResponse(aiResponse);

    // Step 4: Validate generated itineraries
    const validTripOptions = validateBudget(
      parsedResponse.tripOptions,
      budget
    );

    return successResponse(
      res,
      "Trip itinerary generated successfully",
      {
        tripOptions: validTripOptions
      }
    );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  generateTrip
};