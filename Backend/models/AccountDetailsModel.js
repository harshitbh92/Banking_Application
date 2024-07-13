const mongoose = require('mongoose');

// Function to generate a random AccountId
const generateAccountId = () => {
  return 'ACC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

// Declare the Schema of the Mongo model
const AccountDetailsSchema = new mongoose.Schema({
  ApplicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
    unique:true
  },
  AccountId: {
    type: String,
    unique: true,
  },
  account_type: {
    type: String,
    enum: ['savings', 'checking', 'credit'],
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Pre-save hook to generate unique AccountId
AccountDetailsSchema.pre('save', async function (next) {
  const account = this;

  // Generate a new AccountId if it's a new document
  if (account.isNew) {
    let isUnique = false;
    while (!isUnique) {
      const newId = generateAccountId();
      try {
        const existingAccount = await mongoose.models.AccountDetails.findOne({ AccountId: newId });
        if (!existingAccount) {
          account.AccountId = newId;
          isUnique = true;
        }
      } catch (err) {
        return next(err);
      }
    }
  }
  next();
});

// Export the model
module.exports = mongoose.model('AccountDetails', AccountDetailsSchema);
