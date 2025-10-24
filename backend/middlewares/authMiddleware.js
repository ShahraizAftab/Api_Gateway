const jwt = require("jsonwebtoken");

protect = (req, res, next) => {
  // 1️⃣ Get token from headers (commonly sent as "Bearer <token>")
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Add user info to request object
    req.user = decoded;

    // 4️⃣ Move to next middleware or route
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = protect;
