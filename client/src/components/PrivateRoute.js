import React from 'react';
import {Navigate,Outlet} from 'react-router-dom';
// import {useLocalState} 

const PrivateRoute = (isLogged) => {
  return isLogged ? <Outlet/> : <Navigate to="/login" />
}

export default PrivateRoute;