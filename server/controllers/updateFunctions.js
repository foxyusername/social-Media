import { decodeToken } from "./jwtToken.js"
import { insertCommentsQuery, updateLikesQuery, updateServiceBio } from "../services/updateService.js";
import { updateServiceImg } from "../services/updateService.js";
import { userIdQuery } from "../services/allUserInfo.js";
import { updateFollowingService,insertPostQuery,updateContentQuery} from "../services/updateService.js";

import moment from "moment";

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

let result=await updateFollowingService(clientId.id,userId[0].id);

if(result.message){
 res.status(200).json(result);
}

}


export async function insertPosts(req,res){

let description=req.body.description;
let imageUrl=req.body.imageUrl;
let content=req.body.content;

let date=moment().format('YYYY-MM-DD');
let clientId=await decodeToken(req);

try {
 
    let result = await insertPostQuery(description, imageUrl, content, date, clientId.id);
    console.log("Promise resolved:", result);
 
    console.log(result);

 res.status(200).json({message:'post has been uploaded',status:1});
  
} catch (error) {

    res.status(400).json({message:'something went wrong',status:0});
    console.error("Promise rejected:", error);
  }

}

export async function updateContent(req,res){

try{
let content=req.body.content.join(',');

console.log(content);

let clientId=await decodeToken(req);

let result=await updateContentQuery(content,clientId.id);

res.status(200).json({message:'updated succesfully',status:1});

}catch(err){

console.log(err);
  res.status(400).json({error:err,message:'something went wrong',status:0});
}

}

export async function updateLikes(req,res){

  try{

let postId = req.body.postId;

let clientId = await decodeToken(req);

let result = await updateLikesQuery(clientId.id,postId);

res.status(200).json({message:result,status:1});

}catch(err){
 
res.status(400).json({error:err,message:"something went wrong",status:0})

}

}

export async function updateComments(req,res){

try{

let postId=req.body.postId;
let comment=req.body.comment;
let clientId = await decodeToken(req);
let createdAt = moment().format('YYYY-MM-DD');

let result = await insertCommentsQuery(postId,comment,clientId.id,createdAt);

res.status(200).json(result);

}catch(err){

res.status(400).json({error:err,message:'something went wrong',status:0});

}

}