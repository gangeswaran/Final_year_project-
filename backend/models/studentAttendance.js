const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["present", "absent"], required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
