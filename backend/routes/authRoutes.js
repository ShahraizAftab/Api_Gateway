const { Router } = require("express");
const {
  createUser,
  loginUser,
  getUserProfile,
  updateUserPlan,
} = require("../controller/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.patch("/plan", authMiddleware, updateUserPlan);

module.exports = router;
