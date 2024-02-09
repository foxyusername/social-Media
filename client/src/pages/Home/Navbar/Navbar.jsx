import React from 'react'
import "./navbar.css";
import "./responsive.css";
import {useNavigate} from 'react-router-dom';
import { useState } from 'react'
import  Search from '../../../components/search/Search.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome,faSearch} from '@fortawesome/free-solid-svg-icons'
import {faHeart,faCircleUser,faSquarePlus,faImage} from "@fortawesome/free-regular-svg-icons"


function Navbar() {

const [showNavbar,setShowNavbar]=useState(true);

let history=useNavigate();


function hideNavbar(){
  setShowNavbar(true);
}

if(showNavbar){
return <div className='navbarDiv'>
  
  <h1>Lumina</h1>

  <section className='icons_section'>

<div onClick={()=>{history('/home')}}>

<h3>{<FontAwesomeIcon icon={faHome} />}</h3>
<p>Home</p>

</div>

<div onClick={()=>{setShowNavbar(false)}}>

<h3>{<FontAwesomeIcon icon={faSearch} />}</h3>
<p>Search</p>

</div>

<div>

<h3>{<FontAwesomeIcon icon={faHeart} />}</h3>
<p>Notifications</p>

</div>

<div>

<h3>{<FontAwesomeIcon icon={faSquarePlus} />}</h3>
<p>Create</p>

</div>


<div>

<h3>{<FontAwesomeIcon icon={faImage} />}</h3>
<p>content</p>

</div>

<div onClick={()=>{history('/profile')}}>

<img src="https://secure.gravatar.com/avatar/0de72e2274be4b434c7f2bfeebcb0dc1?s=500&d=mm&r=g" alt="user profile image" />
<p>Profile</p>

</div>

 

  </section>

  <button>LOGOUT</button>

  </div>
}else{
  return <Search hideNavbar={hideNavbar}/>
}

}

export default Navbar