const mongoose = require('mongoose');
const Chef = require('./chef');

const companySchema = new mongoose.Schema({
  companyName: String,
  location: String,
  phone: Number,
  email: String,
  password: String,
  people: Number,
  address: String,
  date: String,
  hour: Number,
  card: Number,
  expiration: Number,
  cvv: Number,
  text: String,
  chef: [Chef.schema]
});

module.exports = mongoose.model('Company', companySchema);
