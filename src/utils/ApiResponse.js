class ApiResponse{
    constructor(statusCode,data,message = "Success"){
this.statusCode =statusCode
this.data=data
this.message = message
this.success=  statusCode<400
    }
}

export {ApiResponse}

// Imagine you're ordering a product online from a store. After placing your order, you receive a confirmation message along with details about your order and its status.

// In this scenario:

// Order (API Request): Placing an order on the online store's website is like making an API request. You're requesting a service or action to be performed by the server.

// Confirmation Message (API Response): After placing your order, you receive a confirmation message from the online store. This message contains information about your order, such as the order number, items purchased, and expected delivery date. Similarly, an API response provides feedback to the client (e.g., web browser, mobile app) after processing the request. It includes details about the outcome of the request, such as status code, data, and a message.

// Order Status (Success or Failure): The confirmation message indicates whether your order was successful or encountered any issues. Similarly, an API response includes a status code to indicate whether the request was successful or encountered errors.
//  Summary
// The ApiResponse class models the response returned by an API after processing a request.
// It includes properties such as status code, data, message, and success flag to provide feedback to the client about the outcome of the request.
// Just like receiving a confirmation message after placing an order online, an API response informs the client about the success or failure of the request and includes relevant details.