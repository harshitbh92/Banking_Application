const { generateToken } = require("../config/jwtToken"); 
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const validateMongodbID = require("../utils/validateMongodbId");

const createUser = asyncHandler(async(req,res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email});
    if(!findUser)
    {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else
    {
        throw new Error("User Already exists");
    }
});

const loginUserCtrl = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    //console.log(email , password);
    const findUser = await User.findOne({email});
    //console.log(findUser);
    if(findUser && (await findUser.isPasswordMatched(password))){
            const refreshToken = await generateRefreshToken(findUser?.id);
            const updateUser = await User.findByIdAndUpdate(
                    findUser.id,
                    {
                            refreshToken: refreshToken,

                    },
                    {
                            new:true,
                    }
            );
            res.cookie("refreshToken",refreshToken,{//creates cookie named refreshtoken with value "refreshtoken"
                    httpOnly : true,//it means that the cookie is only accessible 
                    //on the server-side and not through JavaScript on the client-side.
                    maxAge : 72*60*60*1000,
            });
            res.json({
                    _id : findUser?._id,
                    firstname : findUser?.firstname,
                    lastname : findUser?.lastname,
                    email : findUser?.email,
                    mobile : findUser?.mobile,
                    token : generateToken(findUser?._id),
            });
    }
    else{
            throw new Error("Invalid Credentials");
    }
});


module.exports = { createUser,
    loginUserCtrl,
}