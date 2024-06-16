const asyncHandler = require("express-async-handler");
const ApplicationModel = require("../models/ApplicationModel");

const createApplication = asyncHandler(async (req, res) => {
  try {
    const newApplication = await ApplicationModel.create(req.body);
    res.json({
        application_Id: newApplication.ApplicationId, // Assuming the ID is stored in _id
      Description: "Application received successfully.",
      OnlineCredentialsCreated: newApplication.OnlineCredentialCreated,
      status: "succcess"
    })
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
    createApplication
};