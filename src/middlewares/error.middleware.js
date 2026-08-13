function errorMiddleware(err, req, res, next) {
  // Previously every failure collapsed into a flat 500 "Something went wrong",
  // which made a quota error, a malformed AI response and a network drop all
  // look identical from the client and from the logs.
  const statusCode = err.statusCode || 500;

  console.log(`Error [${statusCode}] ${req.method} ${req.originalUrl}:`, err.message);

  // Only send text we wrote ourselves. Raw upstream errors can carry request
  // details and provider internals, so unclassified 500s stay generic.
  const message =
    err.clientMessage ||
    (statusCode < 500 ? err.message : "Something went wrong");

  res.status(statusCode).json({
    success: false,
    message
  });
}

module.exports = errorMiddleware;
