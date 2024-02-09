import {queryUsersInfo} from "../services/usersQuery.js"; 
import {assignJwtToken} from "./jwtToken.js";
import bcrypt from "bcrypt";

async function loginUser(req,res){

//plan :

//make sure that username inserted is correct and that user exists
  //call to the database and query all users id,password where username is equal to req.body.username
  //if returned array's length is equal to 0 , it means inserted username doesn't exist and send response with incorrect username
  //else if array's length is equal to 1 , it means inserted username exists and go on to the next step
       
    //check for password correctness with bcrypt hashing algorythm
    //if it is correct then send accesToken with positive message
    //else send message that password is incorrect

let username=req.body.username;
let insertedPassword=req.body.password;

let userInfo=await queryUsersInfo(username);

if(userInfo.length===0){
    res.status(401).json({message:"username doesn't exist",status:0})
}else{

//compare passwords

 bcrypt.compare(insertedPassword,userInfo[0].password,(err,result)=>{

  if(err)  console.log(err);

  if(result) assignJwtToken(userInfo[0].id,userInfo[0].username,res);

  else res.status(401).json({message: 'password was incorrect', status:0})

 })

}


}


export default loginUser;