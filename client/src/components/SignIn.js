import React,{useState,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {UserContext} from '../App'
import { toast } from 'react-toastify';
import * as MYCONSTCLASS from '../constant';


const SignIn = () => {
  const {state,dispatch} = useContext(UserContext);
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
 

   //toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
  const PostData = () => {
    
    //check email validations
    if(!emailRegex.test(email)){
      notifyA("Invalid email")
      return
    }
    

    //sending data to server
    fetch(MYCONSTCLASS.APIURL+"/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error){
        notifyA(data.error);
      }else{
        localStorage.setItem("jwt",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
        dispatch({type:"USER", payload:data.user}); 
        notifyB(data.message);
        navigate("/")
      }
    }).catch(err=>{
      console.log(err)
    })
  }  

  return (
     <div className="form-card">
        <div className="mycard" style={{padding:'85px'}}>
        <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input type="text" placeholder="Enter your email" value={email} onChange={((e)=>{setEmail(e.target.value)})}/>
            <input type="password" placeholder="Enter your password" value={password} onChange={((e)=>{setPassword(e.target.value)})}/>
            <button onClick={()=>{PostData()}} className="btn waves-effect waves-light #64b5f6 blue darken-1">Login</button>
            <h5>
                <Link to="/signup">Dont have an account?</Link>
            </h5>
        </div>
        </div>
    </div>
  )
}

export default SignIn;