import React, { useState } from 'react'
import "./posts.css";

function Posts({posts}) {

if(!posts) return <h1>Loading...</h1>

if (posts && posts.length === 0) return <div className='noPostsDiv'>

<img src="https://cdn0.iconfinder.com/data/icons/phosphor-light-vol-1/256/camera-slash-light-256.png" alt="camera slash  illustration" />

<h1>Posts haven't been uploaded yet.</h1>

</div> 

if(posts.length>0) return <div className='postsDiv'>

{posts.map((result,index)=>{

return <img src={result.media} alt='profile media' key={index}/>
})}

</div>

}

export default Posts