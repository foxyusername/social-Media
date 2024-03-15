import React, { useState,useRef } from 'react'
import "./landingpage.css";
import "./responsive.css";

import {useNavigate} from "react-router-dom";

function LandingPage() {

const [inputValue,setInputValue]=useState('');
const [btnClicked,setBtnClicked]=useState(false);

let history=useNavigate();

let feedbackRef=useRef();
let aboutRef=useRef();

 return <div className='landingPage'>



{btnClicked && <div className='checkmarkDiv'>

 <div>
    <h1>Sent Succesfully</h1>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/2048px-Flat_tick_icon.svg.png" alt="tick icon" />
    <button onClick={()=>{setBtnClicked(false)}}>OK</button>
 </div>
</div>
}
<header>

<h1>Lumina</h1>

<div className='pageLinks'>
    <p onClick={()=>{history('/home')}}>Home</p>
    <p onClick={()=>{aboutRef.current.scrollIntoView()}}>About</p>
    <p onClick={()=>{feedbackRef.current.scrollIntoView()}}>Feedback</p>
</div>

<div className='loginLinks'>

<button onClick={()=>{history('/signup')}}>Create an account</button>
<button onClick={()=>{history('/login')}}>Login</button>

</div>

</header>

<section className='heroPage'>


<h1>Discover Your Passion, Connect with Like-minded Individuals</h1>

<p>Welcome to Lumina, Where Inspiration Meets Community</p>

<button onClick={()=>{history('/signup')}}>Get Started</button>

</section>

<section className='aboutPage' ref={aboutRef}>

<h1>About</h1>

<div className='img_pTag'>
<img src="https://i.pinimg.com/564x/83/32/32/83323275597c0c6da2a3d30cb8944731.jpg" alt="About page image" />

<p>Our social media platform is designed to connect people through shared interests and passions. Whether you're a photography enthusiast, a foodie, a travel junkie, or an art lover, our platform provides a space for you to discover and share content that inspires you. With features like following, liking, commenting, and sharing, you can engage with fellow users and build meaningful connections within our community. Our mission is to create a welcoming and inclusive space where everyone feels empowered to express themselves and explore the world through the lens of others. Join us on our journey to foster creativity, spark conversations, and celebrate diversity.</p>

</div>
</section>

<section ref={feedbackRef} className='feedbackPage'>
  
 <h1>Feedback</h1>

<div className='textarea_pTag'>
 <div className='textarea_btn'>

 <textarea placeholder='Type your feedback here...' onChange={(e)=>{setInputValue(e.target.value)}}></textarea>

 {inputValue.length > 0 && <button onClick={()=>{setBtnClicked(true)}}>Send</button>}

</div>
 <p>We value your feedback! Your input helps us improve and enhance your experience on our social media platform. Whether you have suggestions for new features, encountered a bug, or simply want to share your thoughts, we're here to listen. Your feedback is instrumental in shaping the future of our platform, ensuring that it meets the needs and preferences of our community. Thank you for taking the time to help us make Lumina even better!</p>

</div>
</section>

 </div>
}

export default LandingPage