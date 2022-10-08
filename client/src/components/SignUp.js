import React,{useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import * as MYCONSTCLASS from '../constant';



const SignUp = () => {
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [image,setImage] = useState("");
  const [url,setUrl] =  useState(undefined);

  useEffect(() =>{
    if(url){
      uploadFields()
    }
  },[url])

  const uploadPic = () => {
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
  }
  //toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const uploadFields = ()=>{
     //sending data to server
    // if(!emailRegex.test(email)){
    //   notifyA("Invalid email")
    //   return
    // }
      fetch("/signup",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          pic:url
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error){
          notifyA(data.error);
        }else{
          notifyB(data.message);
          navigate("/login")
        }
        })
        .catch(err=>{
          console.log(err);
        })
  }
  const PostData = () => {
    if(image){
      uploadPic()
    }else{
      uploadFields()
    }
    //check email validations
    if(!emailRegex.test(email)){
      notifyA("Invalid email")
      return
    }else if(!passRegex.test(password)){
      notifyA("Password must contain at least 8 characters, including at least 1 uppercase letter and special characters for example #,@,$ and at least 1 number ");
      return
    }
    

   
  }  
  return (
    <div className="form-card">
    <div className="mycard" style={{padding:'65px'}}>
        <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input type="text" placeholder="Enter your name" value={name} onChange={((e)=>{setName(e.target.value)})}/>
            <input type="email" placeholder="Enter your email" value={email} onChange={((e)=>{setEmail(e.target.value)})}/>
            <input type="password" placeholder="Enter your password" value={password} onChange={((e)=>{setPassword(e.target.value)})}/>
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Pic</span>

                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button onClick={() => { PostData()}} className="btn waves-effect waves-light #64b5f6 blue darken-1">SignUp</button>
            <h5>
                <Link to="/login">Already have an account?</Link>
            </h5>
        </div>
    </div>
    </div>
  )
}


export default SignUp;