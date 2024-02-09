import express from "express";
import { updateBio } from "../controllers/updateFunctions.js";
import { updateProfileImg,updateFollowing } from "../controllers/updateFunctions.js";
import { deleteImageFromCloudinary } from "../controllers/deleteImage.js";
let router=express.Router();


router.put('/bio',updateBio);
router.put('/profileImg',updateProfileImg);
router.put('/deleteProfileImg',deleteImageFromCloudinary);
router.put('/following',updateFollowing);

export {router as updateRouter}