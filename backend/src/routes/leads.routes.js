const express = require("express");
const router = express.Router();

const {
  getLeads,
  getLeadById,
  getMetrics,
} = require("../controllers/leads.controller");

const { protect } = require("../middlewares/auth.middleware");

// Protect all endpoints
router.get("/", protect, getLeads);
router.get("/metrics", protect, getMetrics);
router.get("/:id", protect, getLeadById);

module.exports = router;
