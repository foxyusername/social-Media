import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

export async function deleteImageFromCloudinary(req,res){

let publicId=req.body.publicId;


let response= await cloudinary.uploader.destroy(publicId);

res.status(200).json(response);
}
