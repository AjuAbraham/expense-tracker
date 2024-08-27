import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

const uploadToCloudinary = async(localFilePath:string)=>{
    try {
        if(!localFilePath)return null;
        const res = await cloudinary.uploader.upload(localFilePath,{
            public_id: String(Math.floor(Math.random()*10+1)),
            resource_type: "image",
            folder: "expences"
        })
        console.log("file uploaded successfully ");
        fs.unlinkSync(localFilePath);
        return res;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("error while uploading to cloudinary");
        return null;
    }
}

export default uploadToCloudinary;