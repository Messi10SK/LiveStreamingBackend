import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"
import { DB_NAME } from "../constants.js"
// Think of these imports as getting necessary tools and materials from different places. For example, you might import bricks from one store, a hammer from another, and nails from yet another to build a house.

dotenv.config({
    path:'./.env'
})
// This is like checking a recipe book for specific instructions before cooking. Here, we're configuring our environment by loading variables from a .env file.

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server Running on Port ${process.env.PORT}/${DB_NAME}`)
    })
    // Starting the server is akin to opening a shop for business. Here, we're telling our application to listen for incoming requests on a specific port (or defaulting to port 8000) and logging a message to the console once the server is running. The message indicates the port number and the name of the database being used.
})
.catch((error) => {
    console.error("Error connecting to the database:", error);
  });
//   Connecting to the database is like plugging in electrical appliances. Here, we're attempting to connect to our database, and if successful, we proceed with the server setup. If there's an error, we handle it appropriately.

//   connectDB().then(() => { ... }): This calls the connectDB function, which returns a promise. When the promise resolves (i.e., when the database connection is successfully established), the .then() callback is executed.

// app.listen(process.env.PORT, () => { ... }): Inside the .then() callback, the Express.js application starts listening for incoming HTTP requests on the port specified in the PORT environment variable.

// console.error("Error connecting to the database:", error);: If an error occurs during the database connection process, it is caught by the .catch() block, and an error message is logged to the console.

// Overall, this code sets up an Express.js application with environment variables loaded from a .env file, connects to a MongoDB database, and starts the server(kitchen of restaurent) to handle incoming (can be http more as (order by customer))requests. Any errors during the database connection process are logged to the console.


// So, this code essentially sets up the environment, connects to the database, and starts the server, making our web application accessible and operational.






// the concept of a server:

// Imagine you're throwing a party. You, as the host, have a lot of responsibilities. You need to make sure everyone gets what they need, whether it's food, drinks, or entertainment. You're the central point that everyone relies on to keep the party running smoothly.

// Now, in the digital world, a server is like the host of a party:

// Central Hub: Just like you at the party, a server is a central computer system that other computers connect to. It's the main hub that manages requests and responses.

// Service Provider: Similar to how you provide services like food and drinks at your party, a server provides services to other computers or devices. These services could include storing and sharing files, hosting websites or applications, handling emails, or running games.

// Responding to Requests: When someone at the party asks for something, you respond by fulfilling their request. Similarly, when a computer or device sends a request to a server (like asking to see a webpage), the server processes that request and sends back the necessary information (like showing the webpage).

// Available 24/7: Just as a good host is always available during the party, a server often needs to be available all the time. Many servers run continuously, ready to handle requests at any time of day or night.

// Security: As a host, you might also ensure the safety and security of your guests. Similarly, servers have security measures in place to protect the data and services they provide from unauthorized access or malicious attacks.

// So, in simple terms, a server is like the host of a digital party, providing services and fulfilling requests from other computers and devices on a network.



















































// import mongoose from "mongoose";

// import express from "express";
// import { DB_NAME } from "./constant";


// const app = express();


// ;( async ()=>{
//     try {
//         await  mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`)
//         console.log(`MongoDB Connected... `)
               
        
//         app.on("error",(error)=>{
//             console.error("connection error",error)
//             throw err;
//         })

//       app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
        
//     } catch (error) {
//         console.log("error in connecting database")
//     }
// })()