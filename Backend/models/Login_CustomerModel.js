const mongoose = require('mongoose');

const passwordValidator = (password) => {
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const noSequences = /^(?!.*(1234|3333|zzzz)).*$/;
    return (
      password.length >= 8 &&
      hasNumber.test(password) &&
      hasUpperCase.test(password) &&
      noSequences.test(password)
    );
  };

  const LoginSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique : true,
        minlength: 8,
        maxlength: 20,
        validate: {
            validator: (username) => /^[a-zA-Z0-9]+$/.test(username),
            message: 'Username must contain only letters and numbers, without special characters or spaces.'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
          validator: passwordValidator,
          message: 'Password must be at least 8 characters long, contain at least 1 number and 1 uppercase letter, and not contain sequences like 1234, 3333, zzzz, etc.'
        }
      }
  });

  module.exports = mongoose.model('LoginUser',LoginSchema);