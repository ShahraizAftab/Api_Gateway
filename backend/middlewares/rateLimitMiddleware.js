//////

const { redisClient } = require("../config/redis");

const rateLimiter = async (req, res, next) => {
  const user = req.user;
  console.log("user::", user);
  const endpoint = req.originalUrl;
  console.log("endpoint::", endpoint);

  const limit = user.plan === "pro" ? 100 : 10;
  const key = `rate:${user.id}:${endpoint}`;

  const now = Date.now();

  try {
    console.log("coming in try block");
    const data = await redisClient.get(key);
    console.log("data::", data);
    let requestData = data ? JSON.parse(data) : { count: 0, startTime: now };
    console.log("requestData::", requestData);

    if (now - requestData.startTime > 60 * 1000) {
      requestData = { count: 0, startTime: now };
    }

    if (requestData.count >= limit) {
      return res.status(429).json({
        message: `Rate limit exceeded. Allowed ${limit} requests/min for ${user.plan} plan`,
      });
    }

    requestData.count++;
    await redisClient.set(key, JSON.stringify(requestData));

    next();
  } catch (err) {
    console.error("❗ Rate limiter error:", err);
    res.status(500).json({ message: "Rate limiter error" });
  }
};

module.exports = rateLimiter;
