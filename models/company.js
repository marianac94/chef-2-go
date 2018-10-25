const mongoose = require('mongoose');
const Chef = require('./chef');

const companySchema = new mongoose.Schema({
  companyName: String,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  chef: [Chef.schema]
});

module.exports = mongoose.model('Company', companySchema);
