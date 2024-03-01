import { ApiError } from "../utils/ApiError.js";
import {asyncHandler}  from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
// app.use mein router hai jab user/userRouter pe redirct hoga vo ki routes folder mein hai user.routes.js phir useme router.route("/register").post(registerUser) registerUser function call hoga  



const generateAccessAndRefreshToken = async (userId) => {
    try {
       const user =  await User.findById(userId)
       const accessToken =  user.generateAccessToken()
       const refreshToken =  user.generateRefreshToken()


       user.refreshToken = refreshToken
      await  user.save({validateBeforeSave: false})

      return {accessToken,refreshToken}



    } catch (error) {
       throw new ApiError(500,"something went wrong while generating refresh and access token")
    }
}
// user ko id ke base pe find karega fir access and refresh token generate hoga  user refresh token ko database mein store karadiya
// method return karega access token and refresh token
// This function generates access and refresh tokens for a user identified by their userId. It retrieves the user from the database using the userId, generates both access and refresh tokens for that user, and saves the refresh token to the user object in the database. Finally, it returns an object containing both the access and refresh tokens. If any error occurs during this process, it throws a generic API error with a 500 status code indicating a server-side issue.

// http:localhost:/api/vi/user/register
const registerUser = asyncHandler(async(req,res)=>{
//   res.status(200).json({
//         message:"ok"
//     })  // this is just for checking 

    // for user registration ****************
    // get user details from frontend ....
    // validation - not empty entry ....
    // check if user already exists : username , email ....
    // check for images , check for avatar
    // upload them to cloudinary, avatar 
    // create user object-- create entry in db
    // remove password and refresh token fied from response
    // check for user creation
    // return response

    const {username,email,fullName,avatar,coverImage,password} = req.body;
    // this line of code is typically used to extract data sent by the client in a request body, which can then be used for further processing such as user registration, updating a database record, etc.

    // Destructuring Assignment: Destructuring assignment allows you to extract values from objects or arrays and assign them to variables. It provides a concise way to extract multiple properties from an object.

    // req.body: In Express.js, req.body contains the parsed request body sent by the client in a POST or PUT request. It typically contains data submitted through a form or an API request in JSON format.
    
    // Extracted Properties: The line of code is extracting the following properties from req.body:
    
    // username
    // email
    // fullName
    // avatar
    // coverImage
    // password
    // Variable Assignment: Each extracted property is assigned to a corresponding variable of the same name. This allows you to easily access these properties later in your code using the assigned variables.
// Now you can use these variables in your code
// console.log(username); // Print the username submitted in the request body
if([fullName,email,username,password].some(()=>
    field?.trim() ==="")
    ){
        throw new ApiError(400,"fullName is required");
    }
    // This code checks if any of these fields are empty or contain only whitespace characters.
    // The trim() method in JavaScript removes whitespace from both ends of a string. Whitespace includes spaces, tabs, and newline characters.

const existedUser = await User.findOne({
    $or:[{username},{email}]
})
// In a user authentication system, it's common to check if a user with a given username or email already exists in the database before allowing a new registration with the same credentials.
// user.findnone is method from mongoose it searches for single document that matches the criteria
// $or Operator: The $or operator is a logical operator in MongoDB that performs a logical OR operation on an array of two or more expressions. It allows you to specify multiple conditions, and if any of the conditions are true, the document is returned.


if (existedUser) {
    throw new ApiError(409,"User already exists");
}

const avatarLocalPath = req.files?.avatar[0]?.path
// This code snippet assigns the local file path of the uploaded avatar to the variable avatarLocalPath
// Optional Chaining (?.): The optional chaining operator (?.) is used to safely access nested properties of objects. If any intermediate property along the chain is null or undefined, the expression short-circuits and returns undefined instead of throwing an error.
// ye server pe file aagyi 
// const coverImageLocalPath = req.files?.coverImage[0]?.path;

let coverImageLocalPath;
    
if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path;
}
if (!avatarLocalPath) {
    throw new ApiError(400,"Avatar file is required");
}

avatar = await uploadOnCloudinary(avatarLocalPath)

coverImage = await  uploadOnCloudinary(coverImageLocalPath)


if (!avatar) {
    throw new ApiError(400,"Avatar file is required");
}

const user = await User.create({
    fullName,
    username:username.toLowerCase(),
    email,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    password
})



// This code creates a new user in a database using the Mongoose ORM, presumably in a Node.js application. Let's break it down:

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)
// This code retrieves a user document from the database by its _id and excludes the password and refreshToken fields from the retrieved document.
// _id is generate by mongoose 
//.select("-password -refreshToken") is used to specify which fields should be excluded from the retrieved document. Fields are excluded by prefixing their names with a minus sign (-).



if (!createdUser) {
    throw new ApiError(500,"something went wrong while registering the user");
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User created and Registered Successfully")
)

// This code sends a JSON response to the client indicating that the user has been successfully created and registered.



})


const loginUser = asyncHandler(async(req,res)=>{

    // req body se data
// username email hai ki nhi 
// password hai ki nhi
// find the user 
// check if user exist 
// if exist password check
//  access and refresh token generate 
// send in form of cookies 
// response successfully login
const {email,username,password} = req.body

if (!username || !email) {
    throw new ApiError(400,"username and email are required");
}


const user = await User.findOne({
    $or:[{username},{email}]
})

if (!user) {
    throw new ApiError(404,"User not exist and not found");
}

const isPasswordValid = await user.isPasswordCorrect(password);

if (!isPasswordValid) {
    throw new ApiError(401,"Invalid user credentials");
}

const {accessToken,refreshToken} =await generateAccessAndRefreshToken(user._id)

const loggedInUser =  User.findById(user._id).select("-password -refreshToken")


const options ={
    httpOnly :true, 
    secure :true
}
// httpOnly: This property is a boolean that, when set to true, tells the browser to prevent client-side scripts from accessing the cookie. This helps mitigate certain types of attacks, such as cross-site scripting (XSS), where an attacker might try to steal cookies using malicious scripts injected into a web page.

// secure: This property is also a boolean. When set to true, it instructs the browser to only send the cookie over HTTPS connections. This helps ensure that the cookie is encrypted during transmission, reducing the risk of it being intercepted by attackers.
// Combining these options ensures that the cookie is secure and not vulnerable to certain types of attacks. It's commonly used for cookies that store sensitive information, such as session tokens used for authentication.
// .cookie(): This method is typically provided by web frameworks like Express.js to set cookies in the HTTP response. It takes three parameters: the name of the cookie, the value to be stored, and an optional options object specifying various cookie settings.
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





const logoutUser = asyncHandler(async(req,res)=>{
    // remove cookies
    // remove refresh token
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                "refreshToken":""
         }
        },
    {
        new:true
    }
    // await User.findByIdAndUpdate(: This method updates a document in the User collection of the database based on the provided parameters.

    //     req.user._id,: It identifies the user to update by using the _id property stored in the req.user object, which was attached by the previous middleware.
        
    //     {$set:{ "refreshToken":"" }}: This is the update operation. It uses the $set operator to set the refreshToken field to an empty string, effectively clearing it.
        
        // ,{ new: true }): This option specifies that the updated document should be returned as the result. Without it, the method returns the document as it was before the update.
    // this code ensures that the refresh token associated with the user identified in the request is cleared in the database, likely used when a user logs out or needs their session invalidated.
    )
    const options ={
        httpOnly :true, 
        secure :true
    }
    
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out successfully"))
    
    
    })
    

export {
    registerUser,
    loginUser,
    logoutUser,
}