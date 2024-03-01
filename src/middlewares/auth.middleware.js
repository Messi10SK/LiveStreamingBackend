import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    // verifyJWT middleware
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") // these are postman methods Authorization bearer "accesstoken"
        // : Retrieves the JWT token either from cookies or from the "Authorization" header (if provided). The ?. operator is used for optional chaining to avoid errors if cookies or headers are not present. 
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // Decodes the JWT token using the jsonwebtoken library and the provided secret key stored in the environment variable ACCESS_TOKEN_SECRET.
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        // : Finds the user corresponding to the decoded token's ID, excluding sensitive information like passwords and refresh tokens.
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        // Sets the user object obtained from the database onto the request object, making it available for subsequent middleware or route handlers.
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})
