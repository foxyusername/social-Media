import { decodeToken } from "./jwtToken.js";
import { allUserInfo } from "../services/allUserInfo.js";
import { userIdQuery } from "../services/allUserInfo.js";

async function sendUserCredentials(req,res){

//this function is wrote for both getting the user info by searching his/her name and accesing it's own account
//first of all check if the request body has username in it. if it does than query information based on that value
//if request body doesn't have username than fetch the info by decoded accesToken's values.

console.log(req.body);

if(req.body.username){

    console.log('username path');

    let userInfo= await allUserInfo(req.body.username);

    if(userInfo.length===0){
        res.status(401).json({message:"username doesn't exist",status:0});
        return
    }

    res.status(200).json(userInfo);
    return 
}

console.log('token path');

let credentials=await decodeToken(req);

let userInfo= await allUserInfo(credentials.username);

res.status(200).json(userInfo);
return 
}

export {sendUserCredentials};