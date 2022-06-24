import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AuthStateSelector } from './redux/reducers/authReducer/authReducer';
import Routers from "./web/router"
import { _io, _url } from './web/services/websocket/websocket';


function App() {
  const {isAuthenticated, appUser} = useSelector(AuthStateSelector)
  const socket = _io(_url, {
    autoConnect: false,
  })

  //For Connecting Websocket, Fetching Notification and alerts
  useEffect(()=>{
    if (appUser?.id && isAuthenticated) {
      socket.auth = { userId: appUser?.id }
      socket.connect()
      
    }
  },[appUser])
  return (
     <Routers isAuthenticated={isAuthenticated} appUser={appUser}/>
  );
}

export default App;
