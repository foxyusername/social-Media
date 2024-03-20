import axios from 'axios';

export const SignupUser=(data,setRegisterSucces,history)=>{

""
//make request to server and send email,username,password with axios post request
//if response will be positive then navigate user to home route
//if response will be negative then return "{message:err.response.data.message,status:0}"

 const api_url=import.meta.env.VITE_API_URL

axios.post(api_url+'/user/signup',{
    username:data.username,
    email: data.email,
    password: data.password
},{
    withCredentials:true
}).then((res)=>{
  ""
  history('/home');
}).catch((err)=>{

""
setRegisterSucces({message:err.response.data.message,status:0});

})


}