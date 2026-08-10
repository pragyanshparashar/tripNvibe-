function validateBudget(tripOptions, userBudget) {
  if (!Array.isArray(tripOptions)) {
    throw new Error("Trip options must be an array");
  }

  if (!userBudget || userBudget <= 0) {
    throw new Error("Invalid user budget");
  }

  const validTripOptions = tripOptions.filter((trip) => {
    if (
      typeof trip.estimatedCost !== "number" ||
      trip.estimatedCost <= 0
    ) {
      return false;
    }

    return trip.estimatedCost <= userBudget;
  });

  if (validTripOptions.length === 0) {
    throw new Error(
      "No itinerary was generated within the selected budget"
    );
  }

  return validTripOptions;
}

module.exports = validateBudget;