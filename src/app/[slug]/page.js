"use client";
import React, {useState} from "react";
import getData from "@/firebase/firestore/getData";
import { useAuthContext } from "@/context/AuthContext";
import { parse } from 'url';
import checkRoom from '@/firebase/auth/checkRoom'
//components
import Aside from "@/components/Aside";
import Chat from "@/components/Chat";
import Playlist from "@/components/Playlist";
import Toolbar from "@/components/Toolbar";
import YouTubeVideo from "@/components/YoutubeVideo";

function Page() {
  const { user, setUser } = useAuthContext();
  const [userData, setUserData] = useState(null)
  const [isThisMyRoom, setIsThisMyRoom] = useState()

   //Checking rooms
   const myRoomCheck = async () =>{
    const currentURL = parse(window.location.href);
    const roomId = currentURL.pathname.substring(1);
    const { uid } = user;
    setIsThisMyRoom(checkRoom(uid,roomId));
}


  React.useEffect(()=>{
    myRoomCheck()
    }, [])

 
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
      {isThisMyRoom && <Toolbar />}
      <YouTubeVideo roomStatus={isThisMyRoom} />
      <Chat />
      <Playlist />
    </div>
  );
}

export default Page;
