import axios from "axios";

export async function getUserCredentials(username){

if(username && username.length>0){

return await axios.post(import.meta.env.VITE_API_URL + '/authenticate/credentials',{
    username:username
},{
    withCredentials:true
}).catch((err)=>alert(err));

}

return await axios.post(import.meta.env.VITE_API_URL + '/authenticate/credentials',{},{
    withCredentials:true
}).catch((err)=>alert(err));



}

export async function profileInfo(username){

console.log('username is '+username);

if(username){
    return await axios.post(import.meta.env.VITE_API_URL + '/receive/profileInfo',{
        username: username
     },{
        withCredentials:true
     }).catch((err) => alert(err));
}else{

    return await axios.post(import.meta.env.VITE_API_URL + '/receive/profileInfo',{},{
        withCredentials:true
     }).catch((err) => alert(err));
}

}

export async function commentsInfo(postId){

console.log(postId);

return await axios.post(import.meta.env.VITE_API_URL + '/receive/commentsInfo',{
    postId:postId
},{
    withCredentials:true
})
.catch(err => console.log(err));

}