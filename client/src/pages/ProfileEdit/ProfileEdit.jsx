import React, { useState } from 'react'
import "./profileEdit.css";
import { useNavigate } from 'react-router-dom';

import Navbar from "../Home/Navbar/Navbar.jsx";
import Loading from '../../components/Loading/Loading.jsx';
import Popup from './Popup/Popup.jsx';
import { getUserCredentials } from '../../serverFunctions/userCredentials.js';
import { updateBio } from '../../serverFunctions/updateFunctions.js';

import {useQuery} from "react-query";

function ProfileEdit() {

const [bio,setBio]=useState('');
const [showPopup,setShowPopup]=useState(false);

let history=useNavigate();

function cancelPopup(){
  setShowPopup(false);
}

function changeBio(e){
  setBio(e.target.value);
}

function checkBioChange(data){

if(bio!==data.bio){
  return true
}

return false;

}

async function onSubmit(data){


if(checkBioChange(data)){
await updateBio(bio);
history('/profile');
}

}


  const {data,isLoading,isError}=useQuery('getUserCredentials',getUserCredentials,{
  refetchOnWindowFocus: false,
  retry: 0,
  enabled:true,
  onSuccess: (data)=>{
    setBio(data.data[0].bio);
  }
  })

if(isLoading) return <Loading />

if (isError) return <div style={{width:'100%',height:'100svh',display:'flex',justifyContent:'center',alignItems:'center'}}>
<h1 style={{fontSize:'50px'}}>Error occured while connecting with server</h1>
</div>

if(data){
  
return <div className='profileEditDiv'>

<div className='profileEditMain'>
<Navbar />

<section className='profileEditSection'>

{showPopup && <Popup currentProfileImg={data.data[0].profileImg} cancelPopup={cancelPopup} profileImg={data.data[0].profileImg} history={history}/>}

<h1>Edit Profile</h1>

<div className='info_btn'>

<div>
    <img src={data.data[0].profileImg} alt="profile photo" />
    <h3>@{data.data[0].username}</h3>
</div>

<button onClick={()=>{setShowPopup(true)}}>Change photo</button>

</div>

<div className='changeBioDiv'>
 
<p>Bio</p>

<textarea maxLength={150} onChange={changeBio} value={bio} resize="none"></textarea>

</div>


<button id="submitBtn" onClick={()=>{onSubmit(data.data[0])}} style={{backgroundColor: !checkBioChange(data.data[0]) && 'rgb(180, 212, 253)'}}>Submit</button>

</section>

</div>

  </div>
}
}

export default ProfileEdit