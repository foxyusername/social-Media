import moment from "moment";
import {queryUsersInfo,insertUserCredentials} from "../services/usersQuery.js";
import {assignJwtToken} from "./jwtToken.js";

const signUpUser=async (req,res)=>{

 try{

 //define the variables for inserted information from user

  let username=req.body.username;
  let email=req.body.email;
  let password=req.body.password;
  let createAt=moment().format('YYYY-MM-D');
  
  //get back the query asyncronously from the database

  const userCredentials=await queryUsersInfo(username);

  console.log(userCredentials);

  //if query is more than zero send him the response that username already exists

  if(userCredentials.length>0){
    res.status(409).json({message: "username already exists!", success: 0})
  }else{

   //inserting credentials in database with insertUserCredentials(), storing and returning the new user ID into variable createdUserID
   //giving this newly created userID to assignJwtToken() to sign jwt token and send it to client

   let createdUserId= await insertUserCredentials(username,email,password,createAt);
   assignJwtToken(createdUserId,username,res);

  }

 }catch(err){
    console.log(err);
 }
}

export default signUpUser;