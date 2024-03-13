import React, { useState,useEffect } from 'react'
import debounce from "lodash.debounce";
import "./search.css";
import axios from "axios";
import {Link, Navigate} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark,faFaceFrown} from '@fortawesome/free-solid-svg-icons'

function Search({hideSearch}) {

//lodash library is being used to send the request to server whenever the user stops typing input
//after stopping for 500 miliseconds debounce function executes and calls the sendRequestToServer function
//sendRequestToServer uses axios to get all the user information
//function stores the information into array
//array gets mapped and result is displayed to user

const [inputValue,setInputValue]=useState('');
const [array,setArray]=useState([]);
const [errMessage,setErrMessage]=useState('');


async function sendRequestToServer(value){
  
let requestValue=await axios.post(import.meta.env.VITE_API_URL + '/user/information',{
  username: value
}).catch(err => {

if(err.response.data.status===0){
  setErrMessage(err.response.data.message);
  setArray([]);
  ""
}

});

if(requestValue?.data.status===1){
  setErrMessage('');
  setArray(requestValue.data.data);
}
}

const debouncedSendRequest = debounce(sendRequestToServer,1000);

useEffect(() => {
  if(inputValue.length!==0){

  debouncedSendRequest(inputValue);
  // Cleanup function to cancel the debounced function if the component unmounts
  return () => debouncedSendRequest.cancel();
  }
}, [inputValue]);

function inputChanged(e){
let value=e.target.value;

if(value.length===0){
setArray([]);
setErrMessage('');
}

setInputValue(value);
}


  return <div className='searchMainDiv'>

   <h1>Search</h1>

<div className='inputDiv'>
   <input onChange={inputChanged} type="text" placeholder='Search...'/>
   <button onClick={hideSearch}><FontAwesomeIcon icon={faXmark} /></button>
</div>

  <section style={{borderTop:array.length>0 || errMessage.length>0 ? "1px solid rgb(164, 164, 164)": 'none'}}>

{array.length>0 && inputValue.length>0 ? array.map((result,index)=>{

 return  <Link id='customLink' to={`/profile/${result.username}`}>
 <div key={index} className='searchedUser'>
   <img src={result.profileImg} alt="Searched people profile photos" />
   <p>{result.username}</p>
 </div>
</Link>
}): errMessage.length>0 && <div className='errDiv'>
  
  <p id='errorMessage'>{errMessage} {<FontAwesomeIcon icon={faFaceFrown} /> } </p>
  
  </div>}

  </section>

  </div>
}

export default Search