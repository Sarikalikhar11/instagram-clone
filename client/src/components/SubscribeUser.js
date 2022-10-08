import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../App';
import {Link} from 'react-router-dom';
import * as MYCONSTCLASS from '../constant';

const SubscribeUser = () => {
  const [data,setData] = useState([]);
  const {state,dispatch} = useContext(UserContext)
  useEffect(() =>{
    fetch(MYCONSTCLASS.APIURL+'/subscribe',{
      headers:{
        "Authorization": "Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      console.log(result);
      setData(result.posts)
    })
  },[])

  const likePost = (id) =>{
    fetch(MYCONSTCLASS.APIURL+'/like',{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
        "Authorization":"Bearer " +localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result=>{
      const newData = data.map(item=>{
        if(item._id==result._id){
          return result;
        }else{
          return item;
        }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err);
    })
  }

  const unlikePost = (id) =>{
    fetch(MYCONSTCLASS.APIURL+'/unlike',{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
        "Authorization":"Bearer " +localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result);
      const newData = data.map(item=>{
        if(item._id==result._id){
          return result;
        }else{
          return item;
        }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err);
    })
  }

  const makeComment=(text,postId)=>{
    fetch(MYCONSTCLASS.APIURL+'/comment',{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer " +localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: postId,
        text: text
      })
    }).then(res=>res.json())
    .then(result=>{
      console.log(result);
      const newData = data.map(item=>{
        if(item._id==result._id){
          return result;
        }else{
          return item;
        }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err);
    })
  }

  const deletePost = (postid) => {
    fetch(MYCONSTCLASS.APIURL+`/deletepost/${postid}`,{
      method:"delete",
      headers:{
        "Authorization": "Bearer " +localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result);
      const newData = data.filter(item=>{
        return item._id !== result._id
      })
      setData(newData)
    })
  }
  // console.log(data);
  return (
     <div className="home">
      {
        data.map(item=>{
          return(
              <div className="card home-card" key={item._id}>
                <div className="home-card-img">
                    <img src={item.postedBy.pic} alt="" />
                  <h5 className="delete-post" style={{padding:'6px'}}><Link to={item.postedBy._id !== state._id ?"/profile/"+item.postedBy._id : "/profile/" }>{item.postedBy.name}</Link> {item.postedBy._id == state._id && 
                  <i className="material-icons delete" style={{cursor:"pointer",display:"flex",float:"right",color:"red"}}
                  onClick={()=>deletePost(item._id)}>delete</i>
                 
                   }</h5>
                </div>
              
                  <div className="card-image">
                      <img alt="" src={item.pic}/>
                  </div>
                  <div className="card-content">
                      <i className="material-icons" style={{color:"red",cursor:"pointer"}}>favorite</i> 
                        {item.likes.includes(state._id)
                          ? 
                            <i className="material-icons" style={{color:"blue",cursor:"pointer"}}
                            onClick={() =>{unlikePost(item._id)}}>thumb_down</i>
                          :
                            <i className="material-icons" style={{color:"blue",cursor:"pointer"}}
                            onClick={() =>{likePost(item._id)}}>thumb_up</i>
                        }
                      
                      
                      <h6>{item.likes.length} likes</h6>
                      <h6>{item.title}</h6>
                      <p>{item.body}</p>
                      {
                        item.comments.map(record=>{
                          return(
                            <h6 key={record._id}><span style={{fontWeight:"600"}} >{record.postedBy.name}</span>{record.text}</h6>
                          )
                        })
                      }
                      <form onSubmit={(e)=>{
                        e.preventDefault();
                        makeComment(e.target[0].value,item._id)
                      }}>
                        <div className="comment input-field">
                          <i className="material-icons" style={{color:'orange'}}>mood</i>
                          <input type="text" placeholder="add a comment"/>
                          {/* <button className="comment" >Post</button> */}
                        </div>
                      </form>
                  </div>
              </div>

          )
        })
      }
      </div>
  )
}

export default SubscribeUser;