import { searchUsersQuery } from "../services/searchQuery.js";

async function searchUsers(req,res){

let username=req.body.username;

console.log(username);

let result= await searchUsersQuery(username);

if(result.length>0){
    res.status(200).json({data: result, status:1});
}else{
res.status(404).json({ message: "user doesn't exist",status:0});
}

}

export {searchUsers};