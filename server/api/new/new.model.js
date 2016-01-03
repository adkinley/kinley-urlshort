'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence');

var NewSchema = new Schema({
  baseUrl: String,
  shortUrl: Number,
  active: Boolean
});

NewSchema.plugin(AutoIncrement, {inc_field:'shortUrl'});

module.exports = mongoose.model('New', NewSchema);