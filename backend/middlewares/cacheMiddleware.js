// import redisClient from "../config/redis.js";
const { redisClient } = require("../config/redis");

const cacheMiddleware = async (req, res, next) => {
  const cacheKey = req.originalUrl;

  try {
    const cachedData = await redisClient.get(cacheKey);
    // console.log("cachedData::::", cachedData);
    if (cachedData) {
      res.locals.cacheStatus = "HIT";
      console.log("📦 Cache Hit:", cacheKey);
      return res.status(200).json(JSON.parse(cachedData));
    }
    res.locals.cacheStatus = "MISS";
    console.log("🆕 Cache Miss:", cacheKey);
    next();
  } catch (error) {
    console.error("Cache error:", error);
    next();
  }
};

module.exports = cacheMiddleware;
