class ApiError extends Error{
    constructor(
        statusCode,
        message ="Something went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.errors=errors
        this.data =this
        this.success=false
        this.message =message

        if(stack){
            this.stack =stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}
// Sure, let's break down the ApiError class using a real-life analogy:

// Imagine you're a teacher grading your students' assignments. Sometimes, students make mistakes or don't follow instructions correctly. You want to provide feedback to help them understand what went wrong and how they can improve.

// In this scenario:

// Teacher (ApiError Class): You are the teacher, responsible for evaluating students' assignments and providing feedback. Similarly, the ApiError class is responsible for handling errors in your API (Application Programming Interface) and providing meaningful feedback to clients (applications or users) that interact with your API.

// Assignments (API Requests): Students submit assignments to you for evaluation. Similarly, clients make requests to your API, expecting certain actions to be performed.

// Mistakes (Errors): Sometimes, students make mistakes in their assignments. These mistakes could be grammatical errors, incorrect answers, or missing information. Similarly, errors can occur in API requests due to various reasons such as invalid input, missing data, or internal server issues.

// Feedback (Error Response): As a teacher, you provide feedback to students about their mistakes. This feedback includes details about what went wrong and suggestions for improvement. Similarly, the ApiError class generates error responses to API requests. These error responses include information such as the status code (e.g., 400 for bad request, 500 for internal server error), error message, and any additional details (such as specific errors or stack trace).

// Now, let's relate the properties and methods of the ApiError class to this analogy:

// statusCode: This is like the grade you assign to a student's assignment. It indicates the severity of the error encountered in the API request. For example, a status code of 400 might indicate a client error, while a status code of 500 might indicate a server error.

// message: This is like the feedback you provide to a student about their mistake. It explains what went wrong in the API request in a human-readable format. If no message is provided, a default message like "Something went wrong" is used, similar to providing generic feedback.

// errors: These are like the specific mistakes you identify in a student's assignment. They provide additional details about the errors encountered in the API request, helping clients understand the nature of the problem.

// stack: This is like the detailed comments you write on a student's assignment, explaining the thought process behind your evaluation. The stack trace provides information about the sequence of function calls leading to the error, aiding developers in debugging issues within the API.

// data: This property can be used to include additional data related to the error. It's like providing extra resources or references to help students understand the feedback provided.

// success: This property indicates whether the API request was successful or not. For errors, it's set to false, indicating that the request encountered a problem.

// Overall, the ApiError class helps in effectively communicating errors encountered in API requests, similar to how a teacher provides feedback to students on their assignments, ultimately facilitating better understanding and improvement.


// API
// Customer (Client): You represent the client, which could be a web browser, mobile app, or any software application that wants to interact with a service.
// Waiter (API): The waiter acts as the API (Application Programming Interface). It's the intermediary between you (the client) and the kitchen (the server). The waiter takes your order (request), communicates it to the kitchen, and brings back the prepared food (response).
// Kitchen (Server): The kitchen represents the server or backend system that processes your order. It takes the request from the waiter (API), performs the necessary actions (e.g., cooking the food), and sends back a response (e.g., the prepared meal).