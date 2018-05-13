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
    }
  },

  {
    collection: 'holdings'
  }
);

module.exports = mongoose.model('Holding', holding);
