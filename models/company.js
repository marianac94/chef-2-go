const mongoose = require('mongoose');
const Chef = require('./chef');

const companySchema = new mongoose.Schema({
  companyName: String,
  username: String,
  password: String,
  chef: [Chef.schema]
});

module.exports = mongoose.model('Company', companySchema);
