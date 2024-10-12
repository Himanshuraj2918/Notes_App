import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js"

export const verifyJwt = asyncHandler(async(req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.headers("Authorization")?.split(" ")[1];
    
        if(!token) throw new ApiError(401,"Unauthorized access")
    
        const decodedInfo = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedInfo?._id).select("-password -refreshToken")
    
        if(!user) throw new ApiError(401,"Invalid access")
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access")
    }
})