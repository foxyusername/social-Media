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