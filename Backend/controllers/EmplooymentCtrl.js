const asyncHandler = require('express-async-handler');
const EmploymentDetailsModel = require('../models/EmploymentDetailsModel');

const CreateEmployment = asyncHandler(async(req,res)=>{
    try {
        const newEmployment = await EmploymentDetailsModel.create(req.body);
        res.json(newEmployment);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    CreateEmployment
}