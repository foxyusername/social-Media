import express from "express";
import { updateBio, updateComments, updateLikes } from "../controllers/updateFunctions.js";
import { updateProfileImg,updateFollowing,insertPosts,updateContent } from "../controllers/updateFunctions.js";
import { deleteImageFromCloudinary } from "../controllers/deleteImage.js";
let router=express.Router();


router.put('/bio',updateBio);
router.put('/profileImg',updateProfileImg);
router.put('/deleteProfileImg',deleteImageFromCloudinary);
router.put('/follow',updateFollowing);
router.put('/createPost',insertPosts);
router.put('/content',updateContent);
router.put('/likes',updateLikes);
router.put('/comment',updateComments);

export {router as updateRouter}