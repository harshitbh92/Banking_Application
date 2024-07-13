const mongoose = require('mongoose');

// Function to generate a random TransactionId
const generateTransactionId = () => {
  return 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

// Declare the Schema of the Mongo model
const TransactionsSchema = new mongoose.Schema({
  AccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountDetails',
    required: true,
  },
  TransactionId: {
    type: String,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transaction_type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
  },
  transaction_date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Pre-save hook to generate unique TransactionId
TransactionsSchema.pre('save', async function (next) {
  const transaction = this;

  // Generate a new TransactionId if it's a new document
  if (transaction.isNew) {
    let isUnique = false;
    while (!isUnique) {
      const newId = generateTransactionId();
      const existingTransaction = await mongoose.models.Transactions.findOne({ TransactionId: newId });
      if (!existingTransaction) {
        transaction.TransactionId = newId;
        isUnique = true;
      }
    }
  }
  next();
});

// Export the model
module.exports = mongoose.model('Transactions', TransactionsSchema);
