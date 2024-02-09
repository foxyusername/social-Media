import express from "express";
import { validateToken } from "../controllers/validateToken.js";
import { sendUserCredentials } from "../controllers/sendCredentials.js";

let router=express.Router();

router.get('/',validateToken);
router.post('/credentials',sendUserCredentials);

export {router as validateTokenRouter}