import pool from "../config/database.js";
import bcrypt, { hash } from "bcrypt";

export function queryUsersInfo (username){

//I am going to return the promise
//make a query to the database
//resolve the promise when database querying is done and return it in this function

//with this I will be able to return the queryed results in this particular function

return new Promise ((resolve,reject)=>{

let query='SELECT id,password,username FROM users WHERE username="'+username+'"'

pool.query(query,(err,result)=>{
if(err){
    reject(err)
    console.log(err)
    return
}

resolve(result);

})

})

}

export async function insertUserCredentials(username,email,password,createdAt){

//saltRounds determine how many iterations computer makes to secure the password higher the value more security and more time it takes
//make a promise that I will return the value of insertId from this function
//hash the password
//insert credentials and hashed password in database

try{

let saltRound=5;
let hashedPassword= await bcrypt.hash(password,saltRound);


return  new Promise((resolve,reject)=>{

let query='INSERT INTO users (username,email,password,createdAt) VALUES (?,?,?,?)'

pool.query(query,[username,email,hashedPassword,createdAt],(err,result)=>{
    
if(err){
 reject(err);
 console.log(err);
 return
}

resolve(result.insertId);
})
})

}catch(err){
    throw err
}

}
