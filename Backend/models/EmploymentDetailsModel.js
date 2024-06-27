const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employmentDetailsSchema = new Schema({
  employmentStatus: {
    type: String,
    enum: ['Full-time employed', 'Part-time employed', 'Self-employed', 'Retired', 'Student', 'Not in employment'],
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  annualIncome: {
    type: String,
    enum: ['£0-£24,999', '£25,000-£49,999', '£50,000-£99,999', '£100,000-£149,999', '£150,000+'],
    required: true
  }
});

module.exports = mongoose.model('EmploymentDetails', employmentDetailsSchema);
