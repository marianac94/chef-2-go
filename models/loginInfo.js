const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
});

module.exports = mongoose.model('Login', loginSchema);
