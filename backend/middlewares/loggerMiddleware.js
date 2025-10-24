const Log = require("../models/logSchema");
const logRequest = async (req, res, next) => {
  const start = Date.now();

  res.on("finish", async () => {
    const responseTime = Date.now() - start;

    const cacheStatus = res.locals.cacheStatus || "MISS"; // set by caching layer
    const statusCode = res.statusCode;

    try {
      await Log.create({
        endpoint: req.originalUrl,
        responseTime,
        cacheStatus,
        statusCode,
      });

      console.log(
        `🪵 Log saved → ${req.originalUrl} | ${cacheStatus} | ${responseTime}ms`
      );
    } catch (error) {
      console.error("Failed to log request:", error);
    }
  });

  next();
};

module.exports = logRequest;
