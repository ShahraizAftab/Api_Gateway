require("dotenv").config();
const connectDB = require("./config/dbconnect");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const {
  connectRedis,
  disconnectRedis,
  redisClient,
} = require("./config/redis");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const logRequest = require("./middlewares/loggerMiddleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use(logRequest);

app.use("/auth", authRoutes);
app.use("/api/v1", dataRoutes);

connectDB();

(async () => {
  try {
    await connectRedis(); // connect Redis safely
    console.log("✅ Redis ready, starting server...");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // ✅ Graceful shutdown (handles Ctrl+C or restarts)
    const shutdown = async () => {
      console.log("🛑 Shutting down gracefully...");
      await disconnectRedis();
      server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
})();
