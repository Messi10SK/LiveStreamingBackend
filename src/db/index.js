import mongoose from "mongoose";
// const mongoose = require("mongoose");





const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB

// import mongoose from "mongoose";

// const connectDB = async() =>{
//     try {
//        const connectionInstance =   await mongoose.connect(`${process.env.MONGODB_URI}`)
//         console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//     } catch (error) {
//         console.log("MONGODB connection FAILED ", error)
//         process.exit(1);
//     }
// }
// export default connectDB;

// The line process.exit(1); is used to terminate the Node.js process with a non-zero exit code.

// Here's what happens when you call process.exit(1);:

// The process object is a global object in Node.js that provides information about, and control over, the current Node.js process.
// The exit() method of the process object is used to terminate the Node.js process with an optional exit code.
// When you call process.exit(1);, it immediately stops the Node.js process and exits with an exit code of 1.
// The exit code is a value returned by a process to communicate its status to the parent process that started it. By convention, a non-zero exit code indicates that an error occurred during the execution of the process.
// In the context of your code:

// javascript
// Copy code
// process.exit(1);
// This line is used to forcefully terminate the Node.js process if there's an error connecting to the MongoDB database. Exiting the process with a non-zero exit code signals to any parent processes or system monitoring tools that there was a problem, which can be useful for logging and monitoring purposes.


// connectionInstance.connection.host is part of the Mongoose connection object and it retrieves the host of the connected MongoDB database.