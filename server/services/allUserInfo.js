import pool from "../config/database.js";

export function allUserInfo(username){
 
    //take all the information about the user from users table
    //send it to client

return new Promise ((resolve,reject)=>{

let query='SELECT * FROM users WHERE username=?'

pool.query(query,[username],(err,result)=>{

    if(err) {
console.log(err)
reject(err);
return
}

resolve(result)
return

})


})


}

export function userIdQuery(username){

return new Promise((resolve,reject)=>{
    
let query='SELECT id FROM users WHERE username=?'

pool.query(query,[username],(err,result)=>{
    
if (err) reject(err);
    
if (result) resolve(result); 

})

})

}


export function followStatus(clientId,userId){
return new Promise((resolve,reject)=>{

let selectQuery='SELECT * FROM followers WHERE followerID=? AND followedID=?';

pool.query(selectQuery,[clientId,userId],(err,result)=>{

if(err) reject(err);


if(result.length===0){
  resolve({message:"user hasn't been followed",status:404});
}else{
  resolve({message:"user has been followed",status:200});
}
        
})
})



}

export async function profileInfoQuery(Id){

return new Promise((resolve,reject)=>{

  let query = "SELECT users.profileImg, users.bio, " +
  "(SELECT COUNT(followers.followedID) FROM followers WHERE followers.followedID = users.id) AS followersCount, " +
  "(SELECT COUNT(followers.followerID) FROM followers WHERE followers.followerID = users.id) AS followingsCount, " +
  "GROUP_CONCAT(followers.followerID) AS followers " +
  "FROM users " +
  "LEFT JOIN followers ON followers.followedID = users.id " +
  "WHERE users.id = ? " +
  "GROUP BY users.id, users.profileImg, users.bio";



pool.query(query,[Id],(err,result)=>{


if(err) reject(err);

resolve(result);

})

})

}


export function profilePostsQuery(Id){

return new Promise((resolve,reject)=>{

let query='SELECT media,description,createdAt FROM posts WHERE posts.userID=?'
  
pool.query(query,[Id],(err,result)=>{

if(err) reject(err);

resolve(result);

})

})
  
  }
  
export async function commentsQuery(postId){

return new Promise((resolve,reject)=>{

let query= " SELECT comments.description,comments.createdAt,users.username,users.profileImg "+
"FROM comments JOIN users ON users.id = comments.userID " +
"WHERE comments.postID = ?";

pool.query(query,[postId],(err,result)=>{

if(err) reject(err);

resolve(result);

})


})

}

export async function queryUsers(clientId){

return new Promise((resolve,reject)=>{

 let query= "SELECT username,profileImg,createdAt FROM users WHERE users.id NOT IN (SELECT followedID FROM followers WHERE followerID  = ?) LIMIT 5"  

 pool.query(query,[clientId],(err,result)=>{

 if(err) reject(err);
 
 resolve(result);

 })

})

}