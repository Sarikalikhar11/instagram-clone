import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import * as MYCONSTCLASS from '../constant';

const CreatePost = () => {
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [image,setImage] = useState("");
    const [url,setUrl] = useState("");

    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    useEffect(()=>{
      if(url){
        //sending data to server
      fetch(MYCONSTCLASS.APIURL+"/createpost",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          title: title,
          body:body,
          pic:url
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error){
          notifyA(data.error);
        }else{
          notifyB(data.message);
          navigate("/")
        }
        }).catch(err=>{
          console.log(err)
        })
      }
    },[url])

  const postDetails = () => {
    const data = new FormData();
    data.append("file",image);
    data.append("upload_preset","insta-clone");
    data.append("cloud_name","sarikal11")
      fetch("https://api.cloudinary.com/v1_1/sarikal11/image/upload/", {
      method: "POST", // HTTP Method
      body: data // Data to be sent
    })
      .then(res =>res.json())
      .then(data=>{
        // console.log(data)
        setUrl(data.url)
      })    //alert("image uploaded") && console.log(res)) 
      .catch(err=>{
        console.log(err);
      })
   
};



  return (
    <div className="form-card">
       
        <div className="card input-field auth-card" style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
            }}>
                <div style={{display:"flex",alignItems:"center", justifyContent:"space-between"}}>
                    <h5 style={{fontWeight:"600"}}>Create New Post</h5>
                    <i className="material-icons" style={{color:"purple", fontSize:"30px",padding:"20px",cursor:"pointer"}}>share</i>
                </div>
               {/* <div className="profile">
                    <h5>{item.postedBy.name}</h5>
                 </div> */}
            <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>

                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            {/* <button className="btn waves-effect waves-light #64b5f6 blue darken-1">Submit Post</button> */}
            <button onClick={() =>postDetails()} className="btn waves-effect waves-light #64b5f6 blue darken-1">Submit Post</button>
        </div>
    </div>
  )
        }

export default CreatePost;
