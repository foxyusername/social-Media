import axios from 'axios';


export async function checkToken(){

return await axios.get(import.meta.env.VITE_API_URL + '/authenticate',{
    withCredentials:true
}).catch((error)=> {throw error.response?.data || error.message || 'Unexpected error occurred';});

}