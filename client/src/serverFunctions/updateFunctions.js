import axios from "axios";

export async function updateBio(bio){

await axios.put(import.meta.env.VITE_API_URL + '/update/bio',{
    bio:bio
},{
    withCredentials:true
}).then((res)=>alert('Bio has been updated succesfully')).catch((err)=>alert('something went wrong when connecting with server'))

}

export async function updateProfileImg(profileImg){

await axios.put(import.meta.env.VITE_API_URL + '/update/profileImg',{
    profileImg: profileImg
},{
    withCredentials:true
})
.then(res => alert('profileImg has been updated succesfully'))
.catch(err =>alert('something went wrong when connecting with server'))

}