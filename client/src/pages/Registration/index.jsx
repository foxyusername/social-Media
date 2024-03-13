import React, { useEffect } from 'react'
import "./css/style.css";
import "./css/registerBox.css";
import "./css/darkColors.css";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong,faUser,faEnvelope,faLock,faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";
import { useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import { SignupSchema,LoginSchema } from '../config/FormValid.js';
import { SignupUser } from '../../serverFunctions/SignupUser.js';
import { LoginUser } from '../../serverFunctions/LoginUser.js';
import Loading from '../../components/Loading/Loading.jsx';
import {signUpUser} from "../../serverFunctions/demoAccount.js";
//planning...

//use same component for signup and login, but dynaimcally change them based on what page is user looking for
//if page prop say signup then render everything based on signup else if page prop says login render login.
//if page prop hasn't been defined yet then just return the loading page.
//functionts that send user credentials to backend should also be alternated based on what page is user looking for

function Index({page}) {   


useEffect(()=>{

console.log('execute');

   if (!localStorage.getItem('LuminaAlert')){
    alert('⚠️This website uses "Cross-Website Tracking" in order to avoid any possible errors or breaks please consider to allow "Cross-Website Tracking" in you browser settings')
    localStorage.setItem('LuminaAlert','true'); 
}
    
},[])

let [showPassword,setShowPassword]=useState(false);
let [showPseudoElement,setShowPsudoElement]=useState(false);
let [registerSuccess,setRegisterSuccess]=useState({});
let [correctPassword,setCorrectPassword]=useState();

let history=useNavigate();


const {register,handleSubmit,watch,setValue,formState: {errors},clearErrors}=useForm({
    resolver: yupResolver(page === 'SIGNUP' ? SignupSchema : LoginSchema)
});

const passwordValue=watch('password');

let togglePasswordVisibility=()=>{
    if(showPassword){
        setShowPassword(false);
    }else{
        setShowPassword(true);
    }
}

let clearInputs=()=>{
    setValue('username','');
    setValue('email','');
    setValue('password','');
    setRegisterSuccess({});
    setCorrectPassword('');
 
    clearErrors();
}

 let navigationFunction=()=>{

  //everytime the user navigates to another page inputed credentials will get default values
  //every error will be cleared
  //finally user will be navigated

    if(page==="SIGNUP"){
        history('/login')
    }else if(page==="LOGIN"){
        history('/signup');
    }
  
    clearInputs();
 }

 let goBack=()=>{
   window.history.back();
  clearInputs();
 }


//if page is defined return registration page
    if(page)

    return (
        <section className='mainDiv'>
        
        <form onSubmit={handleSubmit(data=> page === "SIGNUP" ? SignupUser(data,setRegisterSuccess,history) : LoginUser(data,setRegisterSuccess,history,setCorrectPassword))}>

        <section className='registerBox'>
       
       <h1>{page}</h1>
     
     <div className='inputs_btn'>
   
   <section>
    <div className='userInput'> 
    <input autoComplete='off' type="text" placeholder='Username...' value={watch('username')} {...register("username")}/>
    <img src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" alt="Default user logo" />
    </div>

    <h3>{errors.username?.message || registerSuccess?.status===0 && registerSuccess?.message}</h3>
    </section>

   {page==="SIGNUP" && 

   <section>
   
   <div className='emailInput'> 
    <input autoComplete='off' type="text" placeholder='Email...' value={watch('email')} {...register("email")}/>
    <img src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/mail-letter-offer-256.png" alt="Email icon" />
    </div>

     <h3>{errors.email?.message}</h3>
    </section>
}

    <section>

    <div className='passwordInput'>
    <input autoComplete='off' value={passwordValue} type={showPassword ? "text" : "password"} placeholder='Password...'{...register("password")} />
    
    {passwordValue?.length === 0 ? 
     <img src="https://cdn3.iconfinder.com/data/icons/streamline-icon-set-free-pack/48/Streamline-68-512.png" alt="lock vector" />
    :<h2 id='eye' onClick={togglePasswordVisibility} ><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /></h2>}
    
    </div>

    <h3>{errors.password?.message || correctPassword?.length>0 && correctPassword}</h3>
    
    </section>

   <button type='submit'>Get Started</button>

     </div>

     <div className='authMethodsDiv'>

    <img src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-512.png" alt="Google logo" />

    <h3>OR</h3>

    <img onClick={() => {signUpUser(import.meta.env.VITE_GUEST_USERNAME,import.meta.env.VITE_GUEST_PASSWORD,history)}} onMouseLeave={()=>{setShowPsudoElement(false)}} onMouseEnter={()=>{setShowPsudoElement(true)}} src="https://cdn2.iconfinder.com/data/icons/picol-vector/32/user_close-512.png" alt="Default user logo" /> 
    
    {showPseudoElement && <h4>Login with demo account</h4>}
     </div>

     <p onClick={navigationFunction}>don't have an account? {page === "LOGIN" ? "Signup" : "Login"}</p>

      </section>
      
      </form>

<div className='headingDiv' data-aos="fade-left" data-aos-duration="1000">
       <div className='logo_img_text'> 
        <img src="https://res.cloudinary.com/dldonwgcr/image/upload/v1701940433/Lumina_logopng_jdmacr.png" alt="" />
       </div>
    
        <div className='backOption' onClick={goBack}>
        <h2><FontAwesomeIcon icon={faLeftLong} /></h2>
        <h3>Back</h3>
        </div>
</div>

        </section>
    )

 //returning Loading component if page hasn't been defined yet by react
return <Loading />
}

export default Index