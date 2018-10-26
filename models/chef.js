const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  profileImage: String,
  years: Number,
  description: String,
  starter: String,
  main: String,
  dessert: String,
  drink: String,
  name: String,
  username: String,
  password: String
});

module.exports = mongoose.model('Chef', chefSchema);
