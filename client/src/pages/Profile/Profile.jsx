import React from 'react'
import {useQuery} from "react-query"
import { Link } from 'react-router-dom';
import { getUserCredentials, profileInfo } from '../../serverFunctions/userCredentials.js';
import "./profile.css";
import { removeAccesToken } from '../../serverFunctions/checkToken.js';

import Navbar from '../Home/Navbar/Navbar.jsx';
import Posts from './Posts.jsx';
import Loading from "../../components/Loading/Loading.jsx";

function Profile() {

const {data,isLoading,isError}=useQuery('ownProfileQuery',async ()=> await profileInfo(),{
  refetchOnWindowFocus: false,
  retry: 0,
  enabled:true
})

if(isLoading) return <Loading />

if(isError) return <div style={{width:'100%',height:'100svh',display:'flex',justifyContent:'center',alignItems:'center'}}>
<h1 style={{fontSize:'50px'}}>Error occured while connecting with server</h1>
</div>

if(data)


return <div className='profileDiv_center'>

<div className='profileDiv'>

<Navbar />


<section className='profileMainSection'>

<button id='logout' onClick={removeAccesToken}>LOGOUT</button>

<div className='profileHeader'>

  <img src={data.data[0][0].profileImg || 'https://secure.gravatar.com/avatar/0de72e2274be4b434c7f2bfeebcb0dc1?s=500&d=mm&r=g'} alt="profile photo" />

  <div>
    <h1>@{data.data[3].username}</h1>
   <Link to={'/profile/edit'}> <button>Edit profile</button></Link>
  </div>

</div>

<p id='profileBio'>{data.data[0][0].bio}</p>

<div className='checkFollowers'>

<div>
  <h3>{data.data[1].length}</h3>
  <p>posts</p>
</div>

<div>
  <h3>{data.data[0][0].followersCount}</h3>
  <p>followers</p>
</div>

<div>
  <h3>{data.data[0][0].followingsCount}</h3>
  <p>following</p>  
</div>

</div>

<Posts posts={data.data[1]}/>

</section>

</div>

</div>
}

export default Profile