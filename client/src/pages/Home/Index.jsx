import React from 'react'
import { useState } from 'react';
import "./index.css";

import Navbar from './Navbar/Navbar.jsx'
import Content from './Content/Content.jsx'
import Sidebar from './Sidebar/Sidebar.jsx'

function Home() {
  
const [newQuery,setNewQuery]= useState(false);

function refetch(){
 
  if(newQuery === true){
    setNewQuery(false);
  }else{
    setNewQuery(true);
  }

}

  return <div className='mainDiv_centerer'>
  <div className='mainDiv'>
  
  <Navbar  refetch={refetch}/>
  <Content newQuery={newQuery} />
  <Sidebar />

  </div>
  </div>
}

export default Home