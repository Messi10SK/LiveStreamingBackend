
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// app.use mein router hai jab user/userRouter pe redirct hoga vo ki routes folder mein hai user.routes.js phir useme router.route("/register").post(registerUser) registerUser function call hoga  

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
if ([fullName ,email,username,password].some(()=>
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












})
export {registerUser}