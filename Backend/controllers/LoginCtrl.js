const asyncHandler = require("express-async-handler");
const Login_CustomerModel = require("../models/Login_CustomerModel");

const LoginUser = asyncHandler(async (req, res) => {
  const { username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const newUser = new Login_CustomerModel({ username, password });

  newUser.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = {
  LoginUser,
};
