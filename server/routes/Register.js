import express from "express";
import signUpUser from "../controllers/signupFunc.js";
import loginUser  from "../controllers/loginFunc.js";
import { searchUsers } from "../controllers/searchUsers.js";
let router=express.Router();

router.post('/signup',signUpUser);
router.post('/login',loginUser);
router.post('/information',searchUsers);

export {router as RegisterRouter}