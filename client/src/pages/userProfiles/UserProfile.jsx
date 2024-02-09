import React from 'react';
import { useParams,Link } from 'react-router-dom';
import "./UserProfile.css";
import "./userResponsive.css";

import Navbar from "../Home/Navbar/Navbar.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

function UserProfile() {

const {username} = useParams();

  return <div className='userProfileMainDiv'>


<Navbar />

<div className='wrapper'>

  <header>
   <Link to={'/home'}><p><FontAwesomeIcon icon={faArrowLeft} /></p></Link>
   <h1>Nika Jamaspishvili</h1>
  </header>

  <section className='userInfo'>

  <img src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg" alt="user profile image" />

  <div>
   <h1>Nika jamaspishvili</h1>
   <button>Following</button>
  </div>

  </section>

  <p id='userBio'>My whole life I have been traveelling and taking photos has been my hobby</p>


  <div className='accountInfo'>
    <div>
    <h2>2</h2>
    <p>Posts</p>
    </div>

   <div>
    <h2>75</h2>
    <p>Followers</p>
   </div>

   <div>
    <h2>45</h2>
    <p>Following</p>
   </div>

  </div>

<section className='accountMedia'>
    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="account media photo" />
    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="account media photo" />
    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="account media photo" />
    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="account media photo" />
    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="account media photo" />
    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="account media photo" />
    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="account media photo" />
    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="account media photo" />
    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="account media photo" />
    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="account media photo" />
    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="account media photo" />
    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="account media photo" />

</section>


  </div>
  </div>
}

export default UserProfile