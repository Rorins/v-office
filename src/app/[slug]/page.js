"use client";
import React, {useState} from "react";
import getData from "@/firebase/firestore/getData";
import { useAuthContext } from "@/context/AuthContext";
import { parse } from 'url';
import checkRoom from '@/firebase/auth/checkRoom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
//components
import Aside from "@/components/Aside";
import Chat from "@/components/Chat";
import Playlist from "@/components/Playlist";
import Toolbar from "@/components/Toolbar";
import YouTubeVideo from "@/components/YoutubeVideo";
import AboutMe from "@/components/AboutMe";
import Canvas from "@/components/Canvas";

function Page() {

  const { user, setUser } = useAuthContext();
  const [userData, setUserData] = useState(null)
  const [isThisMyRoom, setIsThisMyRoom] = useState()

  const handleArrowDownClick = () => {
    const element = document.querySelector(".arrow_down_target");
    element.scrollIntoView({ behavior: "smooth" });
  };

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
      <Canvas />
     {userData && <AboutMe description={userData.description} username={userData.name}/>}

     {/* arrow */}
     <div className="whiteboard_pointer">
      <h2>Whiteboard</h2>
     <FontAwesomeIcon
            className="arrow_down"
            icon={faCircleArrowDown}
            size="2x"
            onClick={handleArrowDownClick}
       />
       </div>

       <div className="arrow_down_target" style={{ height: "5x" }} ></div>
    </div>
  );
}

export default Page;
