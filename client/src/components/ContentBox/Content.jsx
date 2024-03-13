import "./content.css";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useQuery} from "react-query";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark,faCheck} from '@fortawesome/free-solid-svg-icons'

function Content({hideContent}) {

const [array,setArray]=useState(["Education","Fitnes","Beauty","Food","Fashion","Comedy","Technology","Animals"])
const [selectedBtn,setSelectedBtn]=useState([])
const [done,setDone]=useState(false);

const {data,isLoading,isError}=useQuery('selectContent',selectContent,{
    refetchOnWindowFocus: false,
    retry: 0,
    enabled:true,
    onSuccess:(data)=>{

 // ""('content is: ',data.data.result[0].content);
      
""
    let dataArray=data.data.result[0].content.split(',');
    const indexes = dataArray.map(value => array.indexOf(value));

    setSelectedBtn(indexes);
}
  })


useEffect(()=>{

if(done === true){
    setDone(false);
}

},[selectedBtn])

async function selectContent(){
    return await axios.get(import.meta.env.VITE_API_URL + '/receive/contentInfo',{withCredentials:true})
    .catch(err => "")
}

function handleBtnClick(index) {
    // Check if the index already exists in the selectedBtn array
    const isSelected = selectedBtn.includes(index);
  
    // Create a new array based on the current selectedBtn array
    let updatedSelectedBtn;
  
    if (isSelected) {
      // If the index exists, remove it from the array
      updatedSelectedBtn = selectedBtn.filter(btnIndex => btnIndex !== index);
    } else {
      // If the index doesn't exist, add it to the array
      updatedSelectedBtn = [...selectedBtn, index];
    }
  
    // Update the state with the new array
    setSelectedBtn(updatedSelectedBtn);

  }

function detectArrayChange(){

let serverArray=data.data.result[0].content.split(',');
const indexes = serverArray.map(value => array.indexOf(value));

if(indexes.length !== selectedBtn.length){
    return "changed"
}else{

for(let i=0;i<indexes.length;i++){
   
if(indexes[i]!==selectedBtn[i]){

return "changed";
}
}

return 'not changed';


}

}

function connectServer(){

if(selectedBtn.length > 0 && detectArrayChange() === 'changed' && done === false){

""

let contentResult= selectedBtn.map(index => array[index]);

axios.put(import.meta.env.VITE_API_URL + '/update/content',{
    content: contentResult
},{
    withCredentials:true
})
.then(res => setDone(true))
.catch(err => alert('something went wrong'))
}
}

if(isLoading) return <h1>Loading...</h1>

if(isError) return <h1>something went wrong</h1>

if(data) return <div className='contentMainDiv'>
    
    <section>
    <h3>Select the content you want to see on your home page:</h3>

    <div className='btnWrapper'>
   {array.map((result,index)=>{

   return <button id={selectedBtn.includes(index) ? 'checkedBtn' : undefined} key={index} onClick={()=>{handleBtnClick(index)}}>{result}</button>

   })}
    </div>

    <button id='doneBtn' onClick={connectServer}>{done ? <FontAwesomeIcon icon={faCheck} /> : 'Done'}</button>

</section>

<button id="xBtn" onClick={hideContent}>{<FontAwesomeIcon icon={faXmark} />}</button>

  </div>

}

export default Content