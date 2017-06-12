'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LinkSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Crawler', LinkSchema);
