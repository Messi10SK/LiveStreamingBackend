import  express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'

// This line of code is similar to going to a library and picking up a book you need. Here, we're importing a library called "express" which helps us build web applications in Node.js.

const app= express();
// Imagine you're setting up a workspace to build something. Here, we're creating a workspace for our web application using Express.
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:8000', // Providing a default value
    credentials: true
}));
// CORS is like allowing certain people to enter your house. Here, we're telling our application to allow requests from a specific origin (website), and we're allowing credentials to be sent along with the request.

app.use(express.json({limit:"16kb", extended:true}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
// Parsing JSON and URL-encoded data is like breaking down a recipe into ingredients. We're telling our application to understand data sent in JSON format (like a recipe written in a specific way) and URL-encoded format (like a list of ingredients), with a limit of 16kb each.

app.use(express.static("public"))
// Serving static files is like having a storefront where you display your products. Here, we're telling our application to look for static files (like HTML, CSS, or images) in a folder called "public" and serve them to users.
app.use(cookieParser())
// app.use(cookieParser()) is like giving each guest an invitation as they arrive at your party, and then using middleware to understand and respond to their needs based on the information provided in those invitations (cookies).
// Cookie parsing is like handling tickets at an event. Here, we're telling our application to understand and manage cookies sent by clients (users' web browsers).
// You give each guest an invitation as they arrive. These invitations contain information like their name, dietary preferences, and any other special requests. Similarly, when a client interacts with your website, your server sends a small piece of data called a cookie to the client's browser. This cookie contains information like session identifiers, user preferences, or authentication tokens.
// Keeping Track of Guests (Parsing Cookies): As guests mingle and enjoy the party, you keep track of who's attending and their preferences based on the invitations they received. Similarly, your server uses middleware like cookieParser() to parse incoming cookies from client requests. This middleware extracts the relevant information from cookies, allowing your server to understand and process them.

export {app} 
// Exporting is like packaging up your work to share with others. Here, we're making our Express application available for other parts of our code or other files to use.

// So, in summary, this code sets up an Express application, configures it to handle different types of requests and data formats, serves static files, and prepares it for handling cookies, making it ready to build a web application.




