import { decodeToken } from "./jwtToken.js";
import { allUserInfo, commentsQuery, queryUsers } from "../services/allUserInfo.js";
import { userIdQuery } from "../services/allUserInfo.js";
import { profileInfoQuery } from "../services/allUserInfo.js";
import { profilePostsQuery } from "../services/allUserInfo.js";
import {queryContent,queryAllPostInfo} from "../services/usersQuery.js";
import { decode } from "jsonwebtoken";

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


async function sendProfileCredentials(req,res){

let username=req.body.username;

console.log(username);

let clientFollowing=false;

//this function querys the id of specified username to use it next time in other querys

let clientId=await decodeToken(req);
let userId;

//this if statement is needed so i can get the information for client's current profile as well without the need to provide it's username
//if username hasn't been provided it means client wants his own info so use the token's id
if(username){
userId=await userIdQuery(username);
}else{
userId=[clientId];
}

//this function querys profile info such as profile image,bio,follower count,following count and followers
if(userId.length !== 0){

let profileInfo=await profileInfoQuery(userId[0].id);

console.log(profileInfo[0].followers);

let followers= profileInfo[0].followers?.split(',').map(Number);


followers?.map((result,index)=>{

    if(result === clientId.id){
        clientFollowing=true;
    }
})


//this function querys posts of the user
let postsInfo=await profilePostsQuery(userId[0].id);

 //this if statements check to see what result to send to client after succesfull querys

//first if statement checks if profileInfo is empty array, if it really is then it sends appropiate response
if(profileInfo.length === 0) res.status(404).json({message:"user does not exist",status:0})

//second if user is real but content doesn't exist on his profile
if(postsInfo.length === 0 && profileInfo.length !==0) res.status(200).json([profileInfo,[],{message:"user exists, with no media on his profile",status:0.5,followingStatus:clientFollowing},{username:clientId.username}]); 

//third statement checks if user exists but it doesn't have content on it's channel
if(postsInfo.length !== 0 && profileInfo.length !==0) res.status(200).json([profileInfo,postsInfo,{message:"user exists, with quantity of posts on it's profile",status:1,followingStatus:clientFollowing},{username:clientId.username}]);
}else{
 res.status(200).json(null);
 console.log("user doesn't exist");
}
}


export function sendPostInfo(req,res){

}

export async function sendContentInfo(req,res){

try{

let clientId=await decodeToken(req);

let result= await queryContent(clientId.id);

if(result.length > 0){
    res.status(200).json({result,message:"succesfully queryed the content",status:1});
}else{
    res.status(200).json({message:"content couldn't be found",status:0.5});
}

}catch(err){
res.status(400).json({error:err,message:'something went wrong',status:0})    
}

}


export async function sendAllPostInfo(req,res){

//first of all, choose posts from people who are beign followed by current user
//secondly, choose posts where its content matches the users content
try{

let clientId=await decodeToken(req);

let result=await queryAllPostInfo(clientId.id);

console.log(result);

res.status(200).json({result,message:'queryed all information correctly',status:1});

}catch(err){

console.log(err);

res.status(400).json({error:err,message:'something went wrong',status:0});

}
}

export async function sendCommentInfo(req,res){

try{

let postId = req.body.postId;

let result = await commentsQuery(postId);

res.status(200).json({result,message:'succesfull query',status:1})

}catch(err){
  
res.status(400).json({error:err,message:'something went wrong',status:0});

}

}

export async function sendUserSuggestions(req,res){

try{

let clientId = await decodeToken(req);

let result= await queryUsers(clientId.id);

console.log(result);

res.status(200).json({result:result,message:'queryed information succesfully',status:1});

}catch(err){

    console.log(err);

    res.status(400).json({error:err,message:'something went wrong',status:0});
}
}


export {sendUserCredentials,sendProfileCredentials};