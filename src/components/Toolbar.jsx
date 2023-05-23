"use client";
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCommentDots, faIcons, faVideo, faGear} from "@fortawesome/free-solid-svg-icons";
//Components
import Camera from "@/components/Camera";
import Video from "@/components/Video";
import Options from "@/components/Options";

function Toolbar() {
//tool triggers
const [isCameraOpen, setIsCameraOpen] = useState(false);
const [isVideoOpen, setIsVideoOpen] = useState(false);
const [isOptionsOpen, setIsOptionsOpen] = useState(false);

//Camera
const openCamera = () => {
    setIsCameraOpen(true);
  };

  //Video
  const openVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  // Options
  const openOptions = () => {
    setIsOptionsOpen(true);
  }

  return (
    <div className="toolbar relative">
        <img className="logo" src="/logo-notext.png" />
    <div className="icon webcam " onClick={openCamera}>
    <FontAwesomeIcon className="camera_button" icon={faCamera} />
    </div>  

    <div  onClick={openOptions} className="icon gear">
    <FontAwesomeIcon className="camera_button" icon={faGear} />
    </div>    

    <div className="icon chat">
    <FontAwesomeIcon className="camera_button" icon={faCommentDots} />
    </div>    

     <div className="icon video" onClick={openVideo} >
    <FontAwesomeIcon className="camera_button" icon={faVideo} />
    </div>  
     
    {/* All tools */}
    {isCameraOpen && <Camera/>}  
   {isVideoOpen && <Video onClose={closeVideo}/>}
   {isOptionsOpen && <Options />}
    </div>
  );
}

export default Toolbar;