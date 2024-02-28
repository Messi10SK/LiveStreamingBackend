import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();
 
router.route("/register").post(
    upload.fields([
        {
                 name:"avatar",
                 maxCount: 1
        },
        {
                name:"coverImage",
                maxCount:1
        }
    ])
     ,registerUser)
    //  This route configuration enables users to register by sending a POST request to "/register" with registration data and uploaded avatar and cover image files.
    // upload is middleware
export default router;