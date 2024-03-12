import "./UserProfile.css";
import "./userResponsive.css";
import React, { useEffect } from 'react';
import { useParams,Link, useSearchParams } from 'react-router-dom';
import {useQuery} from "react-query";
import { useState } from "react";

import Navbar from "../Home/Navbar/Navbar.jsx";
import { updateFollowStatus } from '../../serverFunctions/updateFunctions.js';
import { profileInfo } from "../../serverFunctions/userCredentials.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import Loading from "../../components/Loading/Loading.jsx";
import NotFound from "../404/404.jsx";

function UserProfile() {

const [isFollowed,setIsFollowed] = useState(false);

const {username} = useParams();

const {data,isLoading,isError}=useQuery(['profileInfoQuery',username],async ()=> await profileInfo(username),{
  refetchOnWindowFocus: false,
  retry: 0,
  enabled:true,
  onSuccess:(data)=>{
    data.data !==null && setIsFollowed(data.data[2].followingStatus)},
  onError:(err)=>{console.log(err)}
});

if (isLoading) return <Loading />

if (isError) return <div style={{width:'100%',height:'100svh',display:'flex',justifyContent:'center',alignItems:'center'}}>
<h1 style={{fontSize:'50px'}}>Error occured while connecting with server</h1>
</div>

if(data.data !==null ) return <div className='userProfileMainDiv'>

<Navbar />

<div className='wrapper'>

  <header>
   <Link to={'/home'}><p><FontAwesomeIcon icon={faArrowLeft} /></p></Link>
   <h1>{username}</h1>
  </header>

  <section className='userInfo'>

  <img src={data.data[0][0].profileImg} alt="user profile image" />

  <div>
   <h1>{username}</h1>
   <button 
   id={!isFollowed ? "followed" : undefined}   
   onClick={()=>{ 
    setIsFollowed(!isFollowed);
    updateFollowStatus(username);
    }}>{isFollowed ? 'Following' : 'Follow'}</button>
  </div>

  </section>

  <p id='userBio'>{data.data[0][0].bio}</p>


  <div className='accountInfo'>
    <div>
    <h2>{data.data[1].length}</h2>
    <p>Posts</p>
    </div>

   <div>
    <h2>{data.data[0][0].followersCount}</h2>
    <p>Followers</p>
   </div>

   <div>
    <h2>{data.data[0][0].followingsCount}</h2>
    <p>Following</p>
   </div>

  </div>
<section className='accountMedia'>
 {data.data[1].length>0 && data.data[1].map((result,index)=>{

return <img key={index} src={result.media} alt="photos || videos of current user" />

 })}
</section>

  </div>
  </div>

  return <NotFound />
}

export default UserProfile