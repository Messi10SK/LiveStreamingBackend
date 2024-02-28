import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";

// fs is to use filesystem for crud  operation unlink it and many rread documentation 

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret:  process.env.CLOUDINARY_API_SECRET 
  });

  const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null;
  //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto" // koi sa bhi resourece upload kr skte hai
        })
         //file has been uploaded successfully
        // console.log("Succcessfuly file uploaded on cloudinary",response.url);

        fs.unlinkSync(localFilePath);
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath);  // remove the locally saved temporary file as the opertion was failed
        return null;
    }
  }

  export {uploadOnCloudinary}

  // user ne multer dwara file di us file ko hum ne localserver pe rakh di phir cloudinary ne localfilepath leli aur apne(cloudinary) server pe upload kr di fir localfileserverwali unlink krdi(delete)