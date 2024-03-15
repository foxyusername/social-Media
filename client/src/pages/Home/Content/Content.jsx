import "./content.css";
import "./responsive.css";
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart,faComment} from "@fortawesome/free-regular-svg-icons"

import { useState } from "react";
import axios from "axios"
import {useQuery} from 'react-query';
import { updateComments } from "../../../serverFunctions/updateFunctions";

import Comments from '../../../components/Comments/Comments.jsx';

function Content({newQuery}) {

  let [comment,setComment]=useState('');
  let [commentArray,setCommentArray]=useState([]);
  let [showComments,setShowComments]=useState(0);
  let [array,setArray]=useState([]);
  let [userLiked,setUserLiked]=useState([]);
  let [imageUrl,setImageUrl]=useState('');

  const {data,isLoading,isError,refetch}=useQuery(['fetchAllPostInfo',newQuery],fetchData,{
    refetchOnWindowFocus: false,
    retry: 0,
    enabled:true,
    onSuccess:(data)=>{
      console.log(data);
   setArray(data.data.result);

   if(data.data.result[0].userLiked === null){
    setUserLiked([]);
   }else{
    setUserLiked(data.data.result[0].userLiked.split(','));
  }
   //""
    }
  })

  async function fetchData(){

 return await axios.get(import.meta.env.VITE_API_URL + '/receive/allPostInfo',{
  withCredentials:true
 })

}

function likePost(postId){

let likedArray=[...userLiked];  
let postID=postId.toString();

if(likedArray.includes(postID)){

 likedArray = likedArray.filter(item => item !== postID);

for(let i=0;i<array.length;i++){

if(array[i].id === postId){

let newArray = [...array];

newArray[i].like_count-=1

setArray(newArray);

}

}

setUserLiked(likedArray);

}else{

likedArray.push(postID);

for(let i=0;i<array.length;i++){

  if(array[i].id === postId){
  
  let newArray = [...array];
  
  newArray[i].like_count+=1
  
  setArray(newArray);
  
  }
  
  }

setUserLiked(likedArray);

}

axios.put(import.meta.env.VITE_API_URL + '/update/likes',{
  postId:postId
},{
  withCredentials:true
})
.then(res => {
//refetch();

})
}

function checkLiked(id){

if(userLiked !== null){
 let likedPosts = [...userLiked];
 let postId= id.toString();

if(likedPosts.includes(postId)){
  return true
}else{
  return false
}

}else{
 return false 
}

}

function checkComment(postId){

  return commentArray.filter(item => item.postID === postId).map(item => item.comment);

}


if(isLoading) return <h1>Loading...</h1>

if(isError) return <h1>Something went wrong</h1>

if(data) return <div className='contentDiv'>

{showComments !==0 && <Comments postId={showComments} setShowComments={setShowComments} imageUrl={imageUrl}/>}

{array.length > 0 ? array.map((result,index)=>{

  return <section key={index}>
  
  <div className='postInfo'>
    <img src={result.profileImg} alt="user profile image" />
    <div>
      <h3>{result.username}</h3>
      <p>{result.createdAt}</p>
    </div>
  </div>

  <img id="postPhoto" src={result.media} alt="post's photo" />

  <div className='postReactionsDiv'>

  <div id="reactions">
    <div>
      <h2 id={checkLiked(result.id) === true ? 'likedPost' : undefined} onClick={()=>{likePost(result.id)}}>{<FontAwesomeIcon icon={faHeart} />}</h2>
      <h2 onClick={()=>{
        setImageUrl(result.media)
        setShowComments(result.id)}}>{<FontAwesomeIcon icon={faComment} />}</h2>
    </div>
    <p id="likeCount">{result.like_count}</p>
  </div>

  <div id="description">
    <p><strong id="descriptionUsername">{result.username}</strong> {result.description}</p>
  </div>

  <div>

{checkComment(result.id).map((result2,index)=>{

return <p key={index}><strong id="descriptionUsername">you </strong> {result2}</p>

})}
  </div>

 <div className="addCommentDiv">
  <textarea type="text" placeholder="Add a comment" onChange={(e)=>{setComment(e.target.value)}}/>
  {comment.length > 0 && <button onClick={()=>{
    setComment('');
    setCommentArray([...commentArray,{postID:result.id,comment:comment}])
    updateComments(result.id,comment)}} id={checkComment(result.id) === true ? 'commented' : undefined} type="submit">POST</button>}
 </div>

  </div>

   </section>

}) : <div className="noContentDiv">
   <h1>Please choose the content you like or follow someone in order to see posts</h1>  
   <img src="https://cdn0.iconfinder.com/data/icons/phosphor-light-vol-1/256/camera-slash-light-512.png" alt="camera slash" />
  </div>}

  </div>

}

export default Content