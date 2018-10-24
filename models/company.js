const mongoose = require('mongoose');
const Chef = require('./chef');

const companySchema = new mongoose.Schema({
  name: String,
  people: Number,
  date: String,
  time: Number,
  payment: Number,
  chef: [Chef.schema]
});

module.exports = mongoose.model('Company', companySchema);
