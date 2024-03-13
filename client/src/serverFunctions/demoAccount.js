import axios from "axios";

export const signUpUser=(username,password,history)=>{

axios.post(import.meta.env.VITE_API_URL + '/user/login',{
    username: username,
    password: password
},{
withCredentials:true
}).then((res)=>{
    history('/home');
    ""
}).catch((err)=>{
    alert('something went wrong');
    ""
})

}