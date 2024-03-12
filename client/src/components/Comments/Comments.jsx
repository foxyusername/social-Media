import { useQuery } from 'react-query';
import { commentsInfo } from '../../serverFunctions/userCredentials';
import './comments.css';
import { useState } from 'react';

export default function Comments({postId,setShowComments,imageUrl}){

const [commentArray,setCommentArray]=useState([]);

let {data,isLoading,isError}=useQuery('fetchComments',async ()=>{return await commentsInfo(postId)},{
    refetchOnWindowFocus: false,
    retry: 0,
    enabled:true,
    onSuccess:(fetchedData)=>{
  setCommentArray(fetchedData.data.result);
    }
})

function handleClick(e){

    if(e.target.classList.contains('commentsDivMain') === true){
       setShowComments(0);
    }

}

if(isError) return <h1>Error has been detected</h1>

if(isLoading) return <h1>Loading...</h1>

if(data) return <div className='commentsDivMain' onClick={handleClick}>

<div className='commentsDiv'>
<img src={imageUrl} alt='post image'/>

<section>

{commentArray.length > 0 ? commentArray.map((result,index)=>{

return <div className='image_commentInfo'>

<img src={result.profileImg} alt="profile image" />

<div className='commentInfo'>
    <h1>{result.username}</h1>
    <h3>{result.description}</h3>
    <p>{result.createdAt}</p>
</div>

</div>

}) : <div className='noCommentsDiv'>

<h1>No one has commented the post :(</h1>

</div>}

</section>

</div>
</div>

}