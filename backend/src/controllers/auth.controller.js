const jwt = require("jsonwebtoken");

// Hardcoded demo user (for assignment)
const DEMO_USER = {
  id: "admin001",
  email: "admin@gmail.com",
  password: "admin123",
  name: "Admin User",
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: DEMO_USER.id, email: DEMO_USER.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: DEMO_USER.id,
        email: DEMO_USER.email,
        name: DEMO_USER.name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
