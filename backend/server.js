const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./src/config/db");
const leadsRoutes = require("./src/routes/leads.routes");
const authRoutes = require("./src/routes/auth.routes"); // ✅ NEW

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lead-management-dashboard-lemon.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => res.send("✅ Lead Dashboard API running"));

// ✅ Auth Routes
app.use("/api/auth", authRoutes);

// ✅ Leads Routes
app.use("/api/leads", leadsRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
