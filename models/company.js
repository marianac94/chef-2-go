const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  people: Number,
  date: String,
  time: Number,
  payment: Number,
});

module.exports = mongoose.model('Company', companySchema);
