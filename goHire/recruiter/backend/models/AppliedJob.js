const mongoose = require('mongoose');

const AppliedJobSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  jobId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' },
  AppliedAt: { type: Date, default: Date.now },
  isSelected: { type: Boolean, default: false },
  isRejected: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('AppliedJob', AppliedJobSchema);

