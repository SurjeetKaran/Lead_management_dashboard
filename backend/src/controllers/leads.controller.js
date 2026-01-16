const Lead = require("../models/Lead");

// ✅ GET /api/leads?search=&stage=&source=&sortBy=&sortOrder=&page=&limit=
exports.getLeads = async (req, res) => {
  try {
    const {
      search = "",
      stage,
      source,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // search across name/email/phone/company
    if (search.trim()) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    // filters
    if (stage) query.stage = stage;
    if (source) query.source = source;

    // pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // sorting
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const [data, totalCount] = await Promise.all([
      Lead.find(query).sort(sort).skip(skip).limit(limitNum),
      Lead.countDocuments(query),
    ]);

    res.json({
      data,
      meta: {
        totalCount,
        totalPages: Math.ceil(totalCount / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ GET /api/leads/:id
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) return res.status(404).json({ message: "Lead not found" });

    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Dashboard Metrics API (Optional but recommended)
// GET /api/leads/metrics
exports.getMetrics = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const convertedLeads = await Lead.countDocuments({ stage: "Converted" });

    const stageBreakdown = await Lead.aggregate([
      { $group: { _id: "$stage", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      totalLeads,
      convertedLeads,
      stageBreakdown,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
