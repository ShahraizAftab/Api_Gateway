// import mongoose from "mongoose";
const mongoose = require("mongoose");
const logSchema = new mongoose.Schema({
  // apiKey: { type: String, required: true },
  endpoint: { type: String, required: true },
  responseTime: { type: Number, required: true },
  cacheStatus: { type: String, enum: ["HIT", "MISS"], required: true },
  statusCode: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", logSchema);
module.exports = Log;
