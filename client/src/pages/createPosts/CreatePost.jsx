import "./createpost.css";
import { useRef,useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

function CreatePost() {

let history=useNavigate();
let fileInput=useRef(null);

const [imageURL,setImageURL]=useState("");
const [file,setFile]=useState();
const [description,setDescription]=useState("");
const [activeBtn,setActiveBtn]=useState(null);
const [array,setArray]=useState(["Education","Fitnes","Beauty","Food","Fashion","Comedy","Technology","Animals"]);

const handleInputChange=(e)=>{
let file=e.target.files[0];
let imageURL=URL.createObjectURL(file);
setImageURL(imageURL);
setFile(file);
}

const handleImageUpload=async ()=>{

if(file && activeBtn !==null){

let formData=new FormData();

formData.append('file',file);
formData.append('upload_preset','lpihnza5');
formData.append('folder','Lumina/postsMedia');

let result=await axios.post('https://api.cloudinary.com/v1_1/'+import.meta.env.VITE_CLOUDINARY_NAME+'/image/upload',formData)
.catch(err=> alert(err));

//now its time to insert the returned url inside of result in database 
axios.put(import.meta.env.VITE_API_URL + '/update/createPost',{
  description:description,
  imageUrl:result.data.url,
  content: array[activeBtn]
},{
  withCredentials:true
})
.then(res => {
  alert('post has created succesfully');
  history('/home')})
.catch(err => alert(err))
}else{
  alert('picture and content is required!');
}
}

return <div className="postWrapper">

<div className="createPostDiv">

 <header>
  <h1>Create new post</h1>
  <p onClick={handleImageUpload}>Share</p>
 </header>

 <section>

  <div className="photoDiv">
   <input type='file' accept="image/*" onChange={handleInputChange} ref={fileInput}/>
   {imageURL.length === 0 ? <>
   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/224px-Picture_icon_BLACK.svg.png?20180309172929" alt="photo icon illustration" />
   <button onClick={()=>{fileInput.current.click()}}>Select Image</button>
   </>: <div className="selectedImageDiv">
   <button onClick={()=>{
     fileInput.current.value='';
    setImageURL('')}} id="closePhoto">Cancel</button>
   <img id="selectedPhoto" src={imageURL} alt="choosed photo" />
   </div>
   }
   </div>

  <div className="descriptionDiv">
   <textarea onChange={(e)=>{setDescription(e.target.value)}} placeholder="Description..."></textarea>
  </div>

  <div className="selectContentDiv">
    <h1>Content type:</h1>

<div className="Btns">
  
{array.map((result,index)=>{

return <button key={index} id={activeBtn === index ? 'activeBtn' : undefined} onClick={()=>{setActiveBtn(index)}}>{result}</button>

})}

</div>

  </div>

 </section>

  </div>
  </div>
}

export default CreatePost