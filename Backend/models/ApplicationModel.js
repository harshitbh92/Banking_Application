const mongoose = require('mongoose'); // Erase if already required

// Function to generate a random ApplicationId
const generateApplicationId = () => {
  return 'APP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Declare the Schema of the Mongo model
var ApplicationSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please Enter Your First Name'],
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
    required: [true, "Please Enter Your Last Name"]
  },
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  mobile: {
    type: String,
    unique: true,
    match: [/^\d{10}$/, 'Please fill a valid 10-digit phone number']
  },
  dateOfBirth: {
    type: Date
  },
  address: {
    Building_No: {
      type: String,
      required: [true, 'Building No. is needed']
    },
    Sub_Building: {
      type: String
    },
    street: {
      type: String,
      required: [true, 'Street is needed']
    },
    city: {
      type: String,
      required: [true, 'City is needed']
    },
    state: {
      type: String,
      required: [true, 'State is needed']
    },
    zipCode: {
      type: String,
      required: [true, 'ZipCode is needed']
    },
    country: {
      type: String
    },
  },
  ApplicationId: {
    type: String,
    unique: true
  },
  OnlineCredentialCreated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Pre-save hook to generate unique ApplicationId
ApplicationSchema.pre('save', async function (next) {
  const application = this;

  // Generate a new ApplicationId if it's a new document
  if (application.isNew) {
    let isUnique = false;
    while (!isUnique) {
      const newId = generateApplicationId();
      const existingApp = await mongoose.models.Application.findOne({ ApplicationId: newId });
      if (!existingApp) {
        application.ApplicationId = newId;
        isUnique = true;
      }
    }
  }
  next();
});

// Export the model
module.exports = mongoose.model('Application', ApplicationSchema);
