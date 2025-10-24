// import { createClient } from "redis";
const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

// redisClient.connect();
const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("✅ Redis connected");
  }
};

const disconnectRedis = async () => {
  if (redisClient.isOpen) {
    await redisClient.quit();
    console.log("❌ Redis disconnected");
  }
};

redisClient.on("error", (err) => console.error("❗ Redis Error:", err));

module.exports = { connectRedis, disconnectRedis, redisClient };
