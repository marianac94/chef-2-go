const mongoose = require('mongoose');
const Chef = require('./chef');

const userSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: Number,
  payment: Number,
  chef: [Chef.schema]
});

module.exports = mongoose.model('User', userSchema);
