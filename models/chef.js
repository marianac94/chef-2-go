const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  profileImage: String,
  years: String,
  description: String,
  starter: String,
  main: String,
  dessert: String,
  drink: String,
  name: {type: String, required: true},
  address: {type: String, required: true},
  phone: {type: Number, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
});

module.exports = mongoose.model('Chef', chefSchema);
