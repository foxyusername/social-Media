import "./sidebar.css";
import "./responsive.css";
import React from 'react'
import { useState } from "react";
import {useQuery} from 'react-query';
import {Link} from 'react-router-dom';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faCheck} from '@fortawesome/free-solid-svg-icons'

function Sidebar() {

const {data,isLoading,isError} = useQuery('userSuggestion',serverRequest,{
  refetchOnWindowFocus: false,
  retry: 0,
  enabled:true
})

async function serverRequest(){

return await axios.get(import.meta.env.VITE_API_URL + '/receive/userSuggestions',{withCredentials:true})
       .catch(err => "")

}

if (isLoading) return <h1>Loading...</h1>

if (isError) ""

 if (data) return <div className="sidebarDiv">

  <h1>Suggested for you : </h1>

  <section>
   
 {data.data.result.map((result,index)=>{

  return <Link id="sideBarLink" to={'/profile/'+result.username+''} key={index}><div>
      
      <div id="personInfo">
      <img src={result.profileImg} alt="user's profile image" />
    
     <section>
     <h2>{result.username}</h2>
     <h3>{result.createdAt}</h3>
     </section>
    
      </div>

      <p>visit</p>
    </div>
    </Link>
})}
</section>

  </div>

}
export default Sidebar