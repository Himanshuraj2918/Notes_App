import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { options } from "../constant.js";

const generateAccessTokenAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        console.log(user);
        
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        console.log(accessToken);
        console.log(refreshToken);
        
       
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
    
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong will generating token");
    }
}


const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;


    if(
        [name,email,password].some((field)=>field.trim()=="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = await User.findOne({email})

    if(existedUser) throw new ApiError(409,"User already register")

    const user = await User.create({
        name,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select('-password -refreshToken')

    if(!createdUser) throw new ApiError(500,"Something went wrong")

    return res
    .status(200)
    .json(new ApiResponse(200,createdUser,"User register successfully"))
})

const loginUser = asyncHandler(async(req,res)=>{
    const{email,password} = req.body

    if(!email && !password) throw new ApiError(400,"All fields are required")

    const existingUser = await User.findOne({email})

    if(!existingUser)  throw new ApiError(400,"User not exists")

    const isPasswordValid = await existingUser.isPasswordCorrect(password);

    if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

    const {accessToken,refreshToken} = await generateAccessTokenAndRefreshToken(existingUser._id)

    const loggedInUser = await User.findById(existingUser._id).select("-password -refreshToken")

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        )
    )
})

export {registerUser,loginUser}