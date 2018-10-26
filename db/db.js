const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost/chef4';

mongoose.connect(connectionString, {
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to connectionString');
});

 mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

 mongoose.connection.on('error', (err) => {
  console.log('Mongoose error: ', error);
});
