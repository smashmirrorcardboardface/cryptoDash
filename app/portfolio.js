import mongoose from 'mongoose';

const holding = new mongoose.Schema(
  {
    currencyName: {
      type: String
    },
    amount: { type: mongoose.Schema.Decimal128 },
    currencyId: { type: Number }
  },

  {
    collection: 'holdings'
  }
);

export default mongoose.model('Todo', holding);
