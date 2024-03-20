import pool from "../config/database.js"

function searchUsersQuery(username){


return new Promise ((resolve,reject)=>{

let query="SELECT * FROM users WHERE username LIKE '"+username+"%'"

pool.query(query,(err,result)=>{
    if(err) reject(err); 

    resolve(result)
    return

})

})

}

export {searchUsersQuery}