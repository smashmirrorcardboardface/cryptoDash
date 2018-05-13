const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const holding = new mongoose.Schema(
  {
    quantity: {
      type: SchemaTypes.Double
    },
    id: {
      type: Number
    },
    name: { type: String },
    dollarValue: { type: SchemaTypes.Double }
  },

  {
    collection: 'holdings'
  },

  {
    versionKey: false // You should be aware of the outcome after set to false
  }
);

module.exports = mongoose.model('Holding', holding);
