const mongoose = require('mongoose');

var birth = new mongoose.Schema ({
  Name: String,
  Birthdate: Date,
  unique_hash: String,
});

var BirthData = mongoose.model('BirthData', birth);
module.exports = BirthData;
