 //verify the jwt token
//also check user for admin
const User = require("../models/userModel");
const jwt =  require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//
const authMiddleware = asyncHandler(async(req,res,next)=>{
    //req (request), res (response), and next (a callback function to pass control to the next middleware in the chain).
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer"))// "Bearer <token>" so space extracts the token
    {
        token = req.headers.authorization.split(" ")[1];
        try {
            if(token)
            {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            //console.log(decoded);   //--> we get id as return
            const user = await User.findById(decoded?.id);
            req.user = user;
            next();
            }
        } catch (error) {
            throw new Error("Not Authorized, Token Expired! Please login again!");
        }
    }
    else{
        throw new Error("There is no token attached to the header");
    }
});

module.exports = {authMiddleware};