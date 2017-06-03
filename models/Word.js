var mongoose = require('mongoose');

var wordSchema = new mongoose.Schema({
  word: String,
  definition: String
});

module.exports = mongoose.model('Word', wordSchema);
