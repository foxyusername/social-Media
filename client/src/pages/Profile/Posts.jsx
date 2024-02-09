import React, { useState } from 'react'
import "./posts.css";

function Posts() {
  
const [post,setPost]=useState(true);

if (!post) return <div className='noPostsDiv'>

<img src="https://cdn0.iconfinder.com/data/icons/phosphor-light-vol-1/256/camera-slash-light-256.png" alt="camera slash  illustration" />

<h1>Posts haven't been uploaded yet.</h1>

</div> 

return <div className='postsDiv'>

    <img src="https://cdn0.iconfinder.com/data/icons/phosphor-light-vol-1/256/camera-slash-light-256.png"/>
    <img src="https://cdn0.iconfinder.com/data/icons/phosphor-light-vol-1/256/camera-slash-light-256.png"/>
    <img src="https://cdn0.iconfinder.com/data/icons/phosphor-light-vol-1/256/camera-slash-light-256.png"/>
    <img src="https://cdn0.iconfinder.com/data/icons/phosphor-light-vol-1/256/camera-slash-light-256.png"/>
    <img src="https://cdn0.iconfinder.com/data/icons/phosphor-light-vol-1/256/camera-slash-light-256.png"/>
    <img src="https://cdn0.iconfinder.com/data/icons/phosphor-light-vol-1/256/camera-slash-light-256.png"/>
    <img src="https://cdn0.iconfinder.com/data/icons/phosphor-light-vol-1/256/camera-slash-light-256.png"/>
    <img src="https://cdn0.iconfinder.com/data/icons/phosphor-light-vol-1/256/camera-slash-light-256.png"/>
 
</div>

}

export default Posts