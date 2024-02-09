import jwt from "jsonwebtoken"


export function validateToken(req,res){

//check if requested object cookies contain http only cookie with acceToken name
  //validate token and if positive, send positive response to user
//if requested object cookies don't contain http only cookie then send negative message

if(req.cookies.accesToken){

jwt.verify(req.cookies.accesToken,process.env.SECRET_KEY,(err,decoded)=>{

if(err){
    console.log("error has been detected when verifying the token error: "+err);
    res.status(200).json({message:"token doesn't exist",status:0});

}else{
    res.status(200).json({message:'token has been verified succesfully',status:1})
//console.log('token has been verifyed succesfully: '+decoded.id);
}

})

}else{
res.status(200).json({message:"token doesn't exist",status:0});
console.log('cookie doesn"t exist');
}


}