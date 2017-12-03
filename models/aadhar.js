const mongoose = require('mongoose');

var aadhar = new mongoose.Schema ({
  Name: String,
  aadhar_number: String,
  unique_hash: String,
});

var AadharData = mongoose.model('AadharData', aadhar);
module.exports = AadharData;
