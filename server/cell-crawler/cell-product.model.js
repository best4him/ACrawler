'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CelProductchema = new Schema({
  codProdus: String,
  pret: {
    pretActual: String,
    pretVechi: String
  },
  titlu: String,
  date: Date,
  path: String
});

module.exports = mongoose.model('CelProductchema', CelProductchema);
