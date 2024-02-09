import jwt, { decode } from "jsonwebtoken";

function assignJwtToken(id,username,res){

//create the token
//send it to the client with http only cookie
//send message for succesfully registering

console.log(id);
const accesToken=jwt.sign({id,username},process.env.SECRET_KEY);

res.cookie('accesToken',accesToken,{
    httpOnly:true
})

res.status(200).json({message: "user registered succesfully", success: 1})

}

function decodeToken(req){

//this function decodes the token and returns it's values like: id,username

return new Promise((resolve,reject)=>{

jwt.verify(req.cookies.accesToken,process.env.SECRET_KEY,(err,decoded)=>{

let username=decoded.username;
let id=decoded.id;

if(err){
    reject(err)
    return
}else{
   resolve({username,id}); 
   return
}


})

})

}


export {assignJwtToken,decodeToken};