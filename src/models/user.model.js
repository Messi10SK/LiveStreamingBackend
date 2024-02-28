import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
  
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true, 
    },
    fullName: {
        type: String,
        required: true,
        trim: true, 
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url
    },
    watchHIstory:[
        {
        type:Schema.Types.ObjectId,  // cause we will insert video id into watchHistory Array
        ref:"Video"
    }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
     refreshToken: {
          type: String
    }
    },{timestamps:true})


 // all these are mongoose hooks (middleware)
    userSchema.pre("save",async function(next){
        if(!this.isModified("password")) return next();

        this.password = await bcrypt.hash(this.password,10)
        next()
    })
    // it run before saving  user document to database  It's triggered when the save method is called on a Mongoose model.The function first checks if the password field of the user document has been modified. If it hasn't been modified (meaning the user document is being saved for reasons other than changing the password), it immediately calls next() to proceed to the next middleware or the save operation.
    // If the password has been modified, it proceeds to hash the password using bcrypt, a popular library for hashing passwords securely. The 10 passed as the second argument is the salt rounds, which determines the complexity of the hashing algorithm.
    //overAll This middleware ensures that every time a user document is saved or updated, their password is hashed before being stored in the database, providing an additional layer of security to protect user passwords from unauthorized access, even if the database is compromised.
    userSchema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password,this.password)
    }

    //Real-life Example: In a real-world scenario, let's say you have a user logging into your application. When the user submits their login credentials (username/email and password), you would use this method to check if the password provided by the user matches the hashed password stored in the database for that user.
    // For instance, after retrieving the user document from the database based on the provided username/email, you would call isPasswordCorrect method on the user object passing the provided password. If the method returns true, you authenticate the user and grant them access to the application. If it returns false, you deny access as the passwords do not match. This ensures secure authentication by comparing passwords without storing plain text passwords in the database.
  // In a real-world scenario, after a user successfully logs in, you can call generateAccessToken to create an access token containing relevant user information. This access token can then be used to authenticate and authorize subsequent requests made by the user.

   // Additionally, generateRefreshToken can be used to create a refresh token that can be securely stored on the client-side (e.g., in a browser's local storage or a mobile app's secure storage). When the access token expires, the refresh token can be used to obtain a new access token without requiring the user to log in again, providing a smoother user experience while maintaining security.
     // both access and refresh is nearly same access is for short periord and refresh is for long period 
    userSchema.methods.generateAccessToken = function(){
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                username:this.username,
                fullName: this.fullName
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }
    // jwt.sign() function from the jsonwebtoken library is used to create the token. It takes three parameters:
// Payload: Data to be included in the token.
// Secret: A secret key used to sign the token. This key should be kept secret and securely stored.
// Options: Additional options such as expiration time (expiresIn) for the token. The expiration time is set based on the value of process.env.ACCESS_TOKEN_EXPIRY, which should be configured in your environment variables.


    userSchema.Schema.methods.generateRefreshToken = function(){
        return jwt.sign(
         {
            _id: this._id,
            
        },

        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
        
        )
    }




export const User = mongoose.model("User",userSchema)

// Imagine you're building a user authentication system for a web application. You want to ensure that user passwords are securely hashed before storing them in the database. Additionally, you want to generate access and refresh tokens for authenticated users.

// Password Hashing (Pre-Save Hook):

// Purpose: Before saving a user's data to the database, you need to hash their password for security.
// Explanation: The pre("save") middleware function intercepts the save operation on the user schema. It checks if the password field has been modified. If it has, it hashes the password using bcrypt with a salt round of 10 (a measure to increase security). This ensures that passwords are stored securely as hashes in the database.
// Password Verification Method:

// Purpose: You need a method to verify whether a provided password matches the hashed password stored in the database.
// Explanation: The isPasswordCorrect method compares a provided password with the hashed password stored in the user document. It uses bcrypt's compare function to securely compare the passwords. This method is useful during the login process to authenticate users by verifying their passwords.
// Access Token Generation Method:

// Purpose: After a user successfully logs in, you need to generate an access token containing relevant user information for authorization purposes.
// Explanation: The generateAccessToken method creates a JSON Web Token (JWT) containing the user's _id, email, username, and full name. This token is signed using a secret key (ACCESS_TOKEN_SECRET) and has an expiration time set by ACCESS_TOKEN_EXPIRY. Access tokens are typically used to grant access to protected resources or endpoints in the application.
// Refresh Token Generation Method:

// Purpose: Along with the access token, you also need to generate a refresh token to provide a seamless login experience for users.
// Explanation: The generateRefreshToken method creates a JWT containing only the user's _id. This token is signed using a separate secret key (REFRESH_TOKEN_SECRET) and has its own expiration time set by REFRESH_TOKEN_EXPIRY. Refresh tokens are securely stored on the client-side and can be used to obtain new access tokens without requiring the user to log in again.
// In summary, these code snippets demonstrate the implementation of essential functionalities for user authentication, including password hashing, password verification, and token generation, in a Node.js application using Mongoose and JWT for secure user authentication and authorization.