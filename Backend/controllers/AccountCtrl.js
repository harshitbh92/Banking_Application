const asyncHandler = require("express-async-handler");
const AccountDetailsModel = require("../models/AccountDetailsModel");
const ApplicationModel = require("../models/ApplicationModel");

const createAccount = asyncHandler(async (req, res) => {
  const { ApplicationId, account_type } = req.body;
  try {
    // Ensure you await the findById operation
    const application = await ApplicationModel.findById(ApplicationId);
    if (!application) {
      return res.status(404).json({ message: "No Application Found" });
    }

    // Ensure you await the create operation
    const newAccount = await AccountDetailsModel.create({ ApplicationId, account_type });
    res.status(201).json({ newAccount, status: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  createAccount,
};
