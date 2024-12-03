const express = require('express');
const Attendance = require('../models/studentAttendance');
const router = express.Router();

// Record attendance
router.post('/', async (req, res) => {
  const { name, regNo, date, status, latitude, longitude } = req.body;

  try {
    const attendance = new Attendance({
      name,
      regNo,
      date,
      status,
      latitude,
      longitude,
    });

    const savedAttendance = await attendance.save();
    res.status(201).json({ message: "Attendance recorded successfully", data: savedAttendance });
  } catch (error) {
    res.status(500).json({ message: "Failed to record attendance", error: error.message });
  }
});

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch attendance", error: error.message });
  }
});

module.exports = router;
