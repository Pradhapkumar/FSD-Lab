const mongoose = require("mongoose");
require("dotenv").config();

const Question = require("./models/Question");
const sampleQuestions = require("./data/sampleQuestions");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/online_survey";

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    await Question.deleteMany({});
    await Question.insertMany(sampleQuestions);
    console.log(`Seeded ${sampleQuestions.length} survey questions successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  }
}

seedDatabase();

