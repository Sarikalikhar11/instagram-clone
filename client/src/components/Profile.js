import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from '../App';
import * as MYCONSTCLASS from '../constant';

const Profile = () => {
    const [mypics,setPics] = useState([]);
    const {state,dispatch} = useContext(UserContext);
    const [image,setImage] = useState("");
    // const [url,setUrl] =  useState("");
    useEffect(()=>{
        fetch(MYCONSTCLASS.APIURL+'/mypost',{
            headers:{
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            setPics(result.mypost);
        })
    },[])
    useEffect(() =>{
        if(image){
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
                // setUrl(data.url)
                // console.log(data);
                    fetch(MYCONSTCLASS.APIURL+'/updatepic',{
                    method:"PUT",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization":"Bearer " +localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    localStorage.setItem("user", JSON.stringify({...state,pic:result.pic}))
                    dispatch({type:"UPDATEPIC", payload:result.pic})
                })
            })    //alert("image uploaded") && console.log(res)) 
            .catch(err=>{
            console.log(err);
            })   
        }
        
    },[image])
    const updatePhoto = (file) => {
        setImage(file)
        
    }
  return (
    <div style={{maxWidth:"700px",margin:"0px auto"}}>
        <div style={{
            margin:"18px 0px",
            borderBottom:"1px solid grey",
        }}>
            <div style={{
            display:"flex",
            justifyContent: "space-around",
            }}>
            <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px", margin:"10px"}} alt="" src={state?state.pic:"loading..."}/>
                
            </div>
            <div>
                <h4>{state?state.name:"loading"}</h4>
                <h5>{state?state.email:"loading"}</h5>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h6>{mypics.length} posts</h6>
                    <h6>{state?state.follower.length:"0"} followers</h6>
                    <h6>{state?state.following.length:"0"} following</h6>
                </div>
                
            </div>
        </div>
            <div className="file-field input-field" style={{margin:"10px"}}>
                <div className="btn #64b5f6 blue darken-1">
                    <span>Update Pic</span>

                    <input type="file" onChange={(e) => updatePhoto(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
        </div>
        <div className="gallery">
            {
                mypics.map(item=>{
                    return(
                        <img key={item._id} className="item" alt={item.title} src={item.pic} />
                    )
                })
            }
                        
        </div>
    </div>
  )
}

export default Profile