const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const holding = new mongoose.Schema(
  {
    currencyName: {
      type: String
    },
    amount: { type: SchemaTypes.Double },
    currencyId: { type: Number }
  },

  {
    collection: 'holdings'
  }
);

module.exports = mongoose.model('Holding', holding);
