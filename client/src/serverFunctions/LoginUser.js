import axios from "axios";

export const LoginUser=(data,setRegisterSuccess,history,setCorrectPassword)=>{
    console.log(data);

    setRegisterSuccess({});
    setCorrectPassword('');

axios.post(import.meta.env.VITE_API_URL + '/user/login',{
 username: data.username,
 password:data.password
},{
    withCredentials:true
})
.then(res => {
    console.log(res);
    history('/home');
})
.catch(err => {



if(err.response.data.message === 'password was incorrect'){
    setCorrectPassword(err.response.data.message);
}else if(err.response.data.message === "username doesn't exist"){
    setRegisterSuccess({message: err.response.data.message, status: 0});
}else{
    alert('something went wrong when connecting with server');
}

})
}