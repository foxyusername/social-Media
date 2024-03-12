import pool from "../config/database.js";
import {followStatus} from "./allUserInfo.js";

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

export function updateFollowingService(clientId,userId){
 return new Promise(async (resolve,reject)=>{

//user is someone whose profile is getting checked, and client is someone who is checking the profile

//first of all, we need to know if client has followed the following user
//querying, information where followerID= current client id and followedID= current user id

//if query result is empty array it means that client hasn't followed the user so it wants to follow user
//make insert query

//else query result is not empty array it means that client has already followed the user so it wants to unfollow user
//make delete query

let insertQuery='INSERT INTO followers (followerID,followedID) VALUES (?,?)';
let deleteQuery='DELETE FROM followers WHERE followerID=? AND followedID=?';

let followingStatus=await followStatus(clientId,userId);

if(followingStatus.status===200){
 pool.query(deleteQuery,[clientId,userId],(err,result)=>{

if(err) reject(err)

resolve({message:'follow deleted',status:'Delete'})

})
}

if(followingStatus.status===404){
pool.query(insertQuery,[clientId,userId],(err,result)=>{

if(err) reject(err)

resolve({message:"follow inserted",status:'Follow'})

})
}



})
}


export function insertPostQuery(description,imageUrl,content,date,clientId){

return new Promise((resolve,reject)=>{

let query='INSERT INTO posts (description,media,content,createdAt,userID) VALUES (?,?,?,?,?)';

pool.query(query,[description,imageUrl,content,date,clientId],(err,result)=>{

if (err) reject(err);

resolve(result);

})


})

}

export function updateContentQuery(content,clientId){

return new Promise((resolve,reject)=>{

let query='UPDATE users SET content = ? WHERE id = ?';

pool.query(query,[content,clientId],(err,result)=>{

if(err) reject(err)

resolve(result);

})

})

}

export async function updateLikesQuery(clientId,postId){

return new Promise((resolve,reject)=>{
    
    let checkQuery ='SELECT * FROM likes WHERE userID =? AND postID=?';
    let insertQuery ='INSERT INTO likes (userID,postID) VALUES (?,?)';
    let deleteQuery ='DELETE FROM likes WHERE userID=? AND postID=?';
    
    pool.query(checkQuery,[clientId,postId],(err1,checkResult)=>{
    
    if(err1) reject(err1);
    
    if(checkResult.length === 0){

    console.log('insert path');
    
    pool.query(insertQuery,[clientId,postId],(err2,insertResult)=>{

        if(err2) reject(err2);

        resolve('inserted into like table succesfully');

    })

    }else{

    console.log('delete path');

    pool.query(deleteQuery,[clientId,postId],(err3,deleteResult)=>{

    if(err3) reject(err3);

    resolve('deleted from likes table succesfully');

    })

    }

    })
})

}

export async function insertCommentsQuery(postId,comment,clientId,createdAt){

return new Promise((resolve,reject)=>{

let query = 'insert into comments (postID,description,userID,createdAt) values (?,?,?,?)';

pool.query(query,[postId,comment,clientId,createdAt],(err,result)=>{

if(err) reject(err);

resolve({message:'inserted succesfully',status:1});

})

})  


}