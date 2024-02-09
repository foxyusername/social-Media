import { decodeToken } from "./jwtToken.js"
import { updateServiceBio } from "../services/updateService.js";
import { updateServiceImg } from "../services/updateService.js";
import { userIdQuery } from "../services/allUserInfo.js";
import { decode } from "jsonwebtoken";

export async function updateBio(req,res){
    let bio=req.body.bio
    let userID=await decodeToken(req);

   let response=await updateServiceBio(bio,userID.id);

   if(response.status===0) res.status(500).json(response); 
   if(response.status===1) res.status(200).json(response);

}

export async function updateProfileImg(req,res){

let profileImg=req.body.profileImg
let userID=await decodeToken(req);

let response=await updateServiceImg(profileImg,userID.id);

if(response.status===0) res.status(500).json(response);
if(response.status===1) res.status(200).json(response);

}

export async function updateFollowing(req,res){
  
let username=req.body.username;

let userId=await userIdQuery(username); 
let clientId=await decodeToken(req);


console.log(userId,clientId);
}