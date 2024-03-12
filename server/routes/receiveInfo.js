import express from "express";
import { sendAllPostInfo, sendCommentInfo, sendContentInfo, sendProfileCredentials, sendUserSuggestions } from "../controllers/sendCredentials.js";

let router=express.Router();

router.post('/profileInfo',sendProfileCredentials);
router.get('/contentInfo',sendContentInfo);
router.get('/allPostInfo',sendAllPostInfo);
router.post('/commentsInfo',sendCommentInfo);
router.get('/userSuggestions',sendUserSuggestions);

export {router as receiveInfo}