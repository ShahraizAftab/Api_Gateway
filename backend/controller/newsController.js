const axios = require("axios");
const { redisClient } = require("../config/redis");
const getNews = async (req, res) => {
  try {
    console.log("🌍 Fetching data from external API...");

    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=0b4116d98c0244ce85990055a97aa045"
    );
    await redisClient.setEx(req.originalUrl, 60, JSON.stringify(response.data));

    return res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch news data" });
  }
};
module.exports = { getNews };
