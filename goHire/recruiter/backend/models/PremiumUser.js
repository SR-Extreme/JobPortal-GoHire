const mongoose = require('mongoose');

const PremiumUserSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  memberSince: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('PremiumUser', PremiumUserSchema);

