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