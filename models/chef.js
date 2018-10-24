const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  profileImage: String,
  name: String,
  years: String,
  description: String,
  starter: String,
  main: String,
  dessert: String,
  drink: String,
  // ask how to add multiple pictures for profile(should we use array?)
});

module.exports = mongoose.model('Chef', chefSchema);
