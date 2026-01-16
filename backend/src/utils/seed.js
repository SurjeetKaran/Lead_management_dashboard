const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Lead = require("../models/Lead");
const { faker } = require("@faker-js/faker");

const sources = ["Website", "LinkedIn", "Referral", "Ads", "Cold Email", "Other"];
const stages = ["New", "Contacted", "Qualified", "Converted", "Lost"];

const seedLeads = async (count = 500) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    await Lead.deleteMany();
    console.log("🗑️ Old leads deleted");

    const leads = [];

    for (let i = 0; i < count; i++) {
      leads.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number("9#########"),
        company: faker.company.name(),
        source: faker.helpers.arrayElement(sources),
        stage: faker.helpers.arrayElement(stages),
        notes: faker.lorem.sentence(),
      });
    }

    await Lead.insertMany(leads);
    console.log(`✅ Seeded ${count} leads successfully`);

    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    process.exit(1);
  }
};

seedLeads(500);
