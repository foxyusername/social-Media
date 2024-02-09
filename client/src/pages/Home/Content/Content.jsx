import "./content.css";
import "./responsive.css";
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart,faComment} from "@fortawesome/free-regular-svg-icons"

import { useState } from "react";

function Content() {

  let [comment,setComment]=useState('');

  return <div className='contentDiv'>

   <section>
  
  <div className='postInfo'>
    <img src="https://st3.depositphotos.com/2309453/14640/i/1600/depositphotos_146407553-stock-photo-pretty-girl-laughing.jpg" alt="user profile image" />
    <div>
      <h3>NikaJamaspishvili</h3>
      <p>2006-12-1</p>
    </div>
  </div>

  <img id="postPhoto" src="https://wallpaperset.com/w/full/0/c/a/484258.jpg" alt="post's photo" />

  <div className='postReactionsDiv'>

  <div id="reactions">
    <div>
      <h2>{<FontAwesomeIcon icon={faHeart} />}</h2>
      <h2>{<FontAwesomeIcon icon={faComment} />}</h2>
    </div>
    <p id="likeCount">8 likes</p>
  </div>

  <div id="description">
    <p><strong id="descriptionUsername">NikaJamaspishvili</strong> this is the most beautifull photo I have ever seen heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy</p>
  </div>

 <div className="addCommentDiv">
  <textarea type="text" placeholder="Add a comment" onChange={(e)=>{setComment(e.target.value)}}/>
  {comment.length > 0 && <button type="submit">POST</button>}
 </div>

  </div>

   </section>


   
   <section>
  
  <div className='postInfo'>
    <img src="https://st3.depositphotos.com/2309453/14640/i/1600/depositphotos_146407553-stock-photo-pretty-girl-laughing.jpg" alt="user profile image" />
    <div>
      <h3>NikaJamaspishvili</h3>
      <p>2006-12-1</p>
    </div>
  </div>

  <img id="postPhoto" src="https://wallpaperset.com/w/full/0/c/a/484258.jpg" alt="post's photo" />

  <div className='postReactionsDiv'>

  <div id="reactions">
    <div>
      <h2>{<FontAwesomeIcon icon={faHeart} />}</h2>
      <h2>{<FontAwesomeIcon icon={faComment} />}</h2>
    </div>
    <p id="likeCount">8 likes</p>
  </div>

  <div id="description">
    <p><strong id="descriptionUsername">NikaJamaspishvili</strong> this is the most beautifull photo I have ever seen heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy</p>
  </div>

 <div className="addCommentDiv">
  <textarea type="text" placeholder="Add a comment" onChange={(e)=>{setComment(e.target.value)}}/>
  {comment.length > 0 && <button type="submit">POST</button>}
 </div>

  </div>

   </section>

  </div>
}

export default Content