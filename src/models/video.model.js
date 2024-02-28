import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({

    videoFile: {
        type: String, //cloudinary url
        required: true
    },
    thumbnail: {
        type: String, //cloudinary url
        required: true
    },
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    duration: {
        type: Number, 
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }


},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)
// mongooseAggregatePaginate is a plugin that helps divide a large collection of videos into smaller, manageable chunks.
// Dividing Books into Groups (Pagination): You use mongooseAggregatePaginate to divide your collection of 1000 books into groups of 50 books each. This allows you to focus on discussing one group of books at a time during each book club meeting.
export const Video = mongoose.model("Video",videoSchema)


// Let's break down the provided code snippet and explain it as if we're teaching a first-time learner, using a real-life analogy:

// Explanation:

// In this code snippet, we're defining a schema for videos using Mongoose, which is an Object Data Modeling (ODM) library for MongoDB. Think of MongoDB as a giant warehouse where you store different types of items, and Mongoose helps you organize and manage those items effectively.

// Real-life Analogy:

// Imagine you're managing a library for a video streaming service, where you need to categorize and organize various videos available on the platform.

// Simplified Explanation:

// Library Organization (Mongoose Schema): Just like in a library, where each book has specific attributes such as title, author, genre, and publication date, we're defining a schema for videos. This schema specifies the structure and properties of video documents stored in our database.

// Attributes of Videos (Schema Fields):

// videoFile: This is like the location or shelf number where the physical copy of a book is stored in the library. It's a string representing the URL where the video file is hosted, likely on a service like Cloudinary.
// thumbnail: Similar to the cover image of a book displayed in the library catalog, this field stores the URL of the thumbnail image for the video.
// title, description, duration: These are standard attributes of videos, like the title, summary, and length of a movie or TV show.
// views: This is like the number of times a book has been checked out from the library. It keeps track of how many times the video has been viewed by users.
// isPublished: Similar to whether a book is available for borrowing or not, this field indicates whether the video is published and available for users to watch.
// owner: This field establishes a relationship between videos and users. It stores the ID of the user who uploaded or owns the video.
// Adding Timestamps (Automatic Timestamping): Just like a library keeps track of when books are added or updated in its catalog, we're enabling automatic timestamping for video documents. This means that Mongoose will automatically add createdAt and updatedAt fields to each video document, indicating when it was created and last updated.

// Pagination Plugin (Enhancing Functionality): We're using a Mongoose plugin called mongooseAggregatePaginate to enhance the functionality of our video schema. This plugin allows us to paginate query results efficiently, making it easier to handle large sets of video data.

// Exporting the Video Model (Making Available for Use): Finally, we're exporting a Mongoose model named Video based on the defined schema. This model represents the collection of video documents in our MongoDB database, allowing us to perform CRUD (Create, Read, Update, Delete) operations on videos using Mongoose methods.

// Conclusion:

// In summary, this code snippet sets up a schema for organizing and managing video data in a MongoDB database using Mongoose. It defines the structure of video documents, enables automatic timestamping, enhances functionality with pagination, and exports a model for interacting with video data in our application.