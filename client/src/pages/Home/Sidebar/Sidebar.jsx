import "./sidebar.css";
import "./responsive.css";
import React from 'react'
import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faCheck} from '@fortawesome/free-solid-svg-icons'

function Sidebar() {

  return <div className="sidebarDiv">

  <h1>Suggested for you : </h1>

  <section>
    <div>
      
      <div id="personInfo">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_266heNES-uanLdT71Kjw52T0-62bvaLh0F2kl-YQ-A&s" alt="user's profile image" />
    
     <section>
     <h2>Alexsi</h2>
     <h3>2023-12-01</h3>
     </section>
    
      </div>

      <p>Follow</p>
    </div>
  </section>

  </div>

}
export default Sidebar