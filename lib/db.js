const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blockcahin',{
  useMongoClient: true
}).then(() => console.log('Connected'))
  .catch((err) => console.error(err));
