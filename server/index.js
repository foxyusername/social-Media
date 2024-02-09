import  express  from "express"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();

import { RegisterRouter } from "./routes/Register.js";
import { validateTokenRouter } from "./routes/authenticate.js";
import { updateRouter } from "./routes/update.js";

let app=express();

app.use(cors({
    origin: process.env.ORIGIN,
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/user',RegisterRouter);
app.use('/authenticate',validateTokenRouter);
app.use('/update',updateRouter);


app.listen(process.env.PORT,()=>{console.log('server is running on port '+process.env.PORT+'')})