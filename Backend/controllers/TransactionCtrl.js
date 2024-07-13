const asyncHandler = require("express-async-handler");
const Transaction_Model = require("../models/Transaction_Model");
const AccountDetailsModel = require("../models/AccountDetailsModel");

const createTransaction = asyncHandler(async(req,res)=>{
    const {AccountId,amount,transaction_type} = req.body;
    try {
        const account = await AccountDetailsModel.findById(AccountId);
    if (!account) {
      return res.status(404).json({ message: "No Account Found" });
    }
        const newTransaction = await Transaction_Model.create({AccountId,amount,transaction_type});
        res.json({newTransaction,status: "succcess"});
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createTransaction
};