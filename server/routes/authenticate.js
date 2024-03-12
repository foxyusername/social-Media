import express from "express";
import { validateToken } from "../controllers/validateToken.js";
import { sendUserCredentials } from "../controllers/sendCredentials.js";
import { removeToken } from "../controllers/jwtToken.js";

let router=express.Router();

router.get('/',validateToken);
router.get('/removeToken',removeToken);
router.post('/credentials',sendUserCredentials);

export {router as validateTokenRouter}