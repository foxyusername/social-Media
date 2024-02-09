import React from 'react'
import {useQuery} from "react-query";
import "./index.css";

import Navbar from './Navbar/Navbar.jsx'
import Content from './Content/Content.jsx'
import Sidebar from './Sidebar/Sidebar.jsx'

function Home() {
  
  return <div className='mainDiv_centerer'>
  <div className='mainDiv'>
  
  <Navbar />
  <Content />
  <Sidebar />

  </div>
  </div>
}

export default Home