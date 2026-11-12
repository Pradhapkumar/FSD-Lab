const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Question = require("./models/Question");
const Response = require("./models/Response");
const sampleQuestions = require("./data/sampleQuestions");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/online_survey";

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Online Survey Server is Running");
});

// Get random 5 questions using MongoDB $sample aggregation
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 5 } }]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error getting questions", error: error.message });
  }
});

// Persist submitted survey responses in MongoDB
app.post("/api/responses", async (req, res) => {
  try {
    const { answers, score, total } = req.body;
    const response = new Response({
      answers: answers || {},
      score: Number(score) || 0,
      total: Number(total) || 0
    });
    const saved = await response.save();
    res.status(201).json({ message: "Survey response saved", response: saved });
  } catch (error) {
    res.status(500).json({ message: "Error saving response", error: error.message });
  }
});

async function ensureSeedData() {
  const count = await Question.countDocuments();
  if (count === 0) {
    await Question.insertMany(sampleQuestions);
    console.log(`Auto-seeded ${sampleQuestions.length} default questions.`);
  }
}

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    await ensureSeedData();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });

