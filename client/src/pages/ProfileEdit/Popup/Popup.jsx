import React,{useRef, useState} from 'react'
import axios from "axios";
import "./popup.css";

import {updateProfileImg} from "../../../serverFunctions/updateFunctions.js";

function Popup({currentProfileImg,cancelPopup,profileImg,history}) {

const [imageUrl,setImageUrl]=useState('');
const [file,setFile]=useState();

const fileInputRef=useRef(null);

function onSubmit(){
fileInputRef.current.click();
}

function onInputChange(event){

let picture=event.target.files[0];

if(picture){
  setImageUrl(URL.createObjectURL(picture));
  setFile(picture);
}
}

async function handleImageUpload(){

let publicId='Lumina/' + currentProfileImg.split('/').pop().split('.')[0];


let deleteResponse=await axios.put(import.meta.env.VITE_API_URL + '/update/deleteProfileImg',{
 publicId: publicId
})
.catch(err => "")


let formData=new FormData();

formData.append('file',file);
formData.append('upload_preset','lpihnza5');
formData.append('folder','Lumina');

let response=await axios.post('https://api.cloudinary.com/v1_1/'+import.meta.env.VITE_CLOUDINARY_NAME+'/image/upload',formData)
.catch(err => alert('something went wrong when conencting with cloudinary'));

await updateProfileImg(response.data.secure_url);

history('/profile');
}

return <div className='popupMainDiv'>

<div className='popupBox'>
   <img src={imageUrl.length===0 ? profileImg : imageUrl} alt="profile image" />

   <div className='popup_btns'>
    <button onClick={imageUrl ? handleImageUpload : onSubmit}>{imageUrl ? 'Done' : 'Upload Picture'}</button>
    <button onClick={cancelPopup}>Cancel</button>
    <input onChange={onInputChange} accept="image/*" type="file" ref={fileInputRef} />
   </div>
</div>

  </div>
}

export default Popup