const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  companyName: String,
  people: String,
  address: String,
  date: String,
  hour: String,
  card: String,
  cardDate: String,
  cvv: String,
  comments: String
});

module.exports = mongoose.model('Summaryss', summarySchema);
