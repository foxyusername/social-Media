import pool from "../config/database.js";

export function updateServiceBio(bio,userID){


return new Promise((resolve,reject)=>{

let query='UPDATE users SET bio=? WHERE id=?';

pool.query(query,[bio,userID],(err,result)=>{
    
    if(err) reject({message:'something went wrong when updating the bio',status:0});

    if(result) resolve({message:'updated bio succesfully',status:1})

})

});
}

export function updateServiceImg(profileImg,userID){
 let query="UPDATE users SET profileImg=? WHERE id=?";

 return new Promise((resolve,reject)=>{

 pool.query(query,[profileImg,userID],(err,result)=>{
    if(err) reject({message:'something went wrong when updating the profileImg',status:0})

    resolve({message:"updated profileImg succesfully",status:1});
 })


 })
}

export function updateFollowingService(clientId,userid){
    
}