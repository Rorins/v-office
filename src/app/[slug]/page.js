"use client";
import React, {useState} from "react";
import getData from "@/firebase/firestore/getData";
import { parse } from 'url';
//components
import Aside from "@/components/Aside";
import Chat from "@/components/Chat";
import Playlist from "@/components/Playlist";
import Toolbar from "@/components/Toolbar";

function Page() {
  const [userData, setUserData] = useState(null)


   
  //Retrieve single user data
  const getUser = async () =>{
  
      const currentURL = parse(window.location.href);
      const roomId = currentURL.pathname.substring(1);
      console.log(roomId, "ROOM ID")
      const { result, error } = await getData('users', roomId)
      console.log(result, "SINGLE USER DATA")
      setUserData(result);
  }

  //Retrieve single user data on mounted
  React.useEffect(()=>{
    getUser()
    }, [])


  return (
    <div className="main">
     {userData && <img className="main_bg" src={userData.bgroom} >
      </img>}
      <Aside />
      <Toolbar />
      <Chat />
      <Playlist />
    </div>
  );
}

export default Page;
