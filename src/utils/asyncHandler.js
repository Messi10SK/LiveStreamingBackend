const asyncHandler = (requestHandler) =>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}

export {asyncHandler}

// Imagine you're organizing a dinner party at your home. You have invited guests, and you've hired a catering service to handle the cooking and serving of the food. However, sometimes things might not go as planned. For example, the caterer might encounter difficulties while preparing the dishes, such as running out of ingredients or burning a dish.

// In this scenario:

// Dinner Party (Express.js Middleware): You are hosting a dinner party at your home, and you've set up a system to handle various tasks, including cooking and serving food, welcoming guests, and ensuring everyone has a good time. Similarly, in an Express.js application, middleware functions are used to handle various tasks, such as processing requests, handling errors, and managing authentication.

// Catering Service (Request Handler): The catering service represents the function that handles a specific task, such as cooking a particular dish or serving drinks to guests. Similarly, in an Express.js application, a request handler function is responsible for processing a specific route or endpoint, such as fetching data from a database or performing business logic.

// Unforeseen Circumstances (Errors): Sometimes, unexpected issues might arise during the dinner party, such as the caterer encountering difficulties while preparing the food. Similarly, errors can occur in an Express.js application, such as database errors, network issues, or programming mistakes.

// Event Coordinator (asyncHandler): You, as the host of the dinner party, want to ensure that any issues encountered by the catering service are handled gracefully without disrupting the event. Similarly, the asyncHandler function acts as an event coordinator in an Express.js application, ensuring that errors encountered by request handler functions are caught and handled properly without crashing the application.

// MIDDLEWARE
// Middleware in Express.js is like a series of tasks or operations that your server performs on incoming requests before sending a response back to the client.
// Middleware in Express.js is like a checklist of things to do before serving dinner at your party:
// Middleware in Express.js performs tasks or operations on incoming requests before passing them to route handlers or sending responses back to clients.
// Middleware can perform various functions such as logging, parsing request data, handling authentication, and more.
// Middleware functions are executed in the order they are defined, allowing you to create a chain of tasks to be performed sequentially.
// Middleware helps in modularizing your application's logic and keeping your codebase organized and maintainable.


// The asyncHandler function is a higher-order function that takes a request handler function as an argument and returns a new function.
// This new function wraps the original request handler function and ensures that any errors encountered during its execution are caught and passed to the Express.js error handling middleware.
// By using asyncHandler, you can write asynchronous request handler functions using async/await syntax without explicitly handling errors with try/catch blocks, making your code cleaner and more maintainable.

// A request handler function in Express.js is like a specific task or action that your server performs in response to an incoming HTTP request.
// A request handler function in Express.js is like a scripted response to different types of customer inquiries:
// Key Points:

// A request handler function in Express.js is a JavaScript function that takes incoming HTTP requests and provides appropriate responses.
// Request handler functions are typically associated with specific routes or endpoints in your application and are executed when a matching request is received.
// Request handler functions can perform various tasks such as fetching data from a database, processing business logic, rendering views, or sending responses back to clients.
// Request handler functions play a crucial role in defining the behavior and functionality of your Express.js application, allowing you to create dynamic and interactive web services.

// req: Represents the request object, which contains information about the incoming HTTP request from the client. This object includes properties such as the request method, URL, request headers, request body, query parameters, and more. Middleware functions can access and modify the request object as needed.

// res: Represents the response object, which is used to send a response back to the client. This object provides methods for sending various types of responses, such as setting response headers, sending HTTP status codes, and sending data or rendering views. Middleware functions can use the response object to send a response directly or pass control to the next middleware or route handler.

// next: Represents a callback function that is used to pass control to the next middleware function in the chain. Middleware functions can call next() to proceed to the next middleware in the stack. If a middleware function does not end the request-response cycle (by sending a response or calling next()), it must call next() to pass control to the next middleware. This allows you to chain multiple middleware functions together and define the order of execution.


