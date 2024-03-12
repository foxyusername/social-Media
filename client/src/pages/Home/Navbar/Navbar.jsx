import React, { useEffect } from 'react'
import "./navbar.css";
import "./responsive.css";
import {useNavigate,Navigate} from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';

import  Search from '../../../components/search/Search.jsx';
import Content from '../../../components/ContentBox/Content.jsx';
import { removeAccesToken } from '../../../serverFunctions/checkToken.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome,faSearch} from '@fortawesome/free-solid-svg-icons'
import {faHeart,faCircleUser,faSquarePlus,faImage} from "@fortawesome/free-regular-svg-icons"


function Navbar({refetch}) {

const [showNavbar,setShowNavbar]=useState(true);
const [showContent,setShowContent]=useState(false);
const [showSearch,setShowSearch]=useState(false);

let history=useNavigate();

function showNavbarFunction(){
  setShowNavbar(true);
  setShowContent(false);
  setShowSearch(false);

  refetch();
}

function showNavbarFunction2(){
  setShowNavbar(true);
  setShowContent(false);
  setShowSearch(false);

}

function contentClicked(){
  setShowNavbar(false);
  setShowContent(true);
}

function searchClicked(){
setShowNavbar(false);
setShowSearch(true);
}

if(showNavbar){
return <div className='navbarDiv'>
  
  <h1>Lumina</h1>

  <section className='icons_section'>

<div onClick={()=>{history('/home')}}>

<h3>{<FontAwesomeIcon icon={faHome} />}</h3>
<p>Home</p>

</div>

<div onClick={searchClicked}>

<h3>{<FontAwesomeIcon icon={faSearch} />}</h3>
<p>Search</p>

</div>

<div onClick={()=>{history('/create')}}>

<h3>{<FontAwesomeIcon icon={faSquarePlus} />}</h3>
<p>Create</p>

</div>


<div onClick={contentClicked}>

<h3>{<FontAwesomeIcon icon={faImage} />}</h3>
<p>content</p>

</div>

<div onClick={()=>{history('/profile')}}>

<img src="https://secure.gravatar.com/avatar/0de72e2274be4b434c7f2bfeebcb0dc1?s=500&d=mm&r=g" alt="user profile image" />
<p>Profile</p>

</div>

 

  </section>

  <button onClick={removeAccesToken}>LOGOUT</button>

  </div>
}else if(showContent){
  return <Content hideContent={showNavbarFunction} />
}else{
return <Search hideSearch={showNavbarFunction2}/>
}

}

export default Navbar