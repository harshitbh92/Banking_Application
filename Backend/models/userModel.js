const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:[true,'Please Enter Your First Name'],
    },
    middle_name:{
        type: String,
    },
    last_name:{
        type: String,
        required:[true,"Please Enter Your Last Name"]
    },
    email:{
        type:String,
        required:[true,'Please Enter a valid Email'],
        unique:true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    mobile:{
        type:String,
        required:[true,'Please Enter Your Mobile No.'],
        unique:true,
        match: [/^\d{10}$/, 'Please fill a valid 10-digit phone number']
    },
    password:{
        type:String,
        required:[true,'Please Enter your Password'],
    },
    dateOdBirth:{
        type: Date
    },
    role:{
        type:String,
        default:'user'
    },
    address:{
        Building_No: {
            type: String,
          },
          Sub_Building:{
            type:String
          },
          street:{
            type: String,
          },
          city: {
            type: String,
          },
          state: {
            type: String,
          },
          zipCode: {
            type: String,
          },
          country:{
            type:String
          },
          refreshToken :{
            type: String,
        },
    }
},
{
    timestamps:true
});

userSchema.pre('save', async function(next){ 
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.isPasswordMatched = async function(enteredPassword){ 
    return await bcrypt.compare(enteredPassword, this.password);
};


//Export the model
module.exports = mongoose.model('User', userSchema);