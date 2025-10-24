const { Router } = require("express");
const router = Router();
const protect = require("../middlewares/authMiddleware");
const { getNews } = require("../controller/newsController");
const rateLimiter = require("../middlewares/rateLimitMiddleware");
const cacheMiddleware = require("../middlewares/cacheMiddleware");
router.get("/news", protect, rateLimiter, cacheMiddleware, getNews);
module.exports = router;
