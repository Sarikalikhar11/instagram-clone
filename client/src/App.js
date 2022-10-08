
import './App.css';
import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/Navbar'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import UserProfile from './components/UserProfile';
import SubscribeUser from './components/SubscribeUser';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {reducer, initialState} from './reducers/userReducer';
// import {APIURL} from '../src/constant';

export const UserContext = createContext();
// export const APIURL = "http://localhost:5000";

const Routing = () =>{
  const navigate = useNavigate();
  
  const {state,dispatch} = useContext(UserContext);
  
  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem("User"));
 
    if(user){
      dispatch({type:"USER",payload:user});
      
    }
    else{
      navigate('/login');
    }
  },[])
  return(
    <>
      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          
          <Route element={<PrivateRoute isLogged={false}/>}>
            <Route exact path="/profile" element={<Profile/>}/>
          </Route>
          <Route path="/createpost" element={<CreatePost/>}/>
          <Route path="/profile/:userid" element={<UserProfile/>}/>
          <Route path="/subscribe" element={<SubscribeUser/>}/>
      </Routes>
    </>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state:state,dispatch:dispatch}}>
      <BrowserRouter>
      <Navbar/>
        <Routing />
        <ToastContainer theme="dark"/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
