const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema ({
  profileImage: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true
  },
  years: Number,
  description: String,
  starter: String,
  main: String,
  dessert: String,
  drink: String,
  // ask how to add multiple pictures for profile(should we use array?)
  foodImage: String,
});

module.exports = mongoose.model('Chef', chefSchema);
