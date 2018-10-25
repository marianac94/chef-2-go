const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  profileImage: String,
  description: String,
  starter: String,
  main: String,
  dessert: String,
  drink: String,
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // ask how to add multiple pictures for profile(should we use array?)
});

module.exports = mongoose.model('Chef', chefSchema);
