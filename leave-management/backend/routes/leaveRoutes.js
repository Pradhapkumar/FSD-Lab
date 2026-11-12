const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");

// Apply leave
router.post("/", async (req, res) => {
  try {
    const { employeeName, leaveType, startDate, endDate, reason } = req.body;

    if (!employeeName || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ message: "End date cannot be before start date." });
    }

    const leave = new Leave({
      employeeName,
      leaveType,
      startDate,
      endDate,
      reason
    });

    const savedLeave = await leave.save();
    res.status(201).json({
      message: "Leave applied successfully",
      leave: savedLeave
    });
  } catch (error) {
    res.status(500).json({
      message: "Error applying leave",
      error: error.message
    });
  }
});

// Get all leaves (supports optional leaveType and employeeName query filters)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.leaveType) {
      filter.leaveType = req.query.leaveType;
    }
    if (req.query.employeeName) {
      filter.employeeName = new RegExp(req.query.employeeName, "i");
    }

    const leaves = await Leave.find(filter).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({
      message: "Error getting leaves",
      error: error.message
    });
  }
});

module.exports = router;

