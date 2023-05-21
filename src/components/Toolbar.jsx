"use client";
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCommentDots, faHeadphones, faVideo } from "@fortawesome/free-solid-svg-icons";
//Components
import Camera from "@/components/Camera";
import Video from "@/components/Video";

function Toolbar() {
//tool triggers
const [isCameraOpen, setIsCameraOpen] = useState(false);
const [isVideoOpen, setIsVideoOpen] = useState(false);

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

  return (
    <div className="toolbar relative">
        <img className="logo" src="/logo-notext.png" />
    <div className="icon webcam " onClick={openCamera}>
    <FontAwesomeIcon className="camera_button" icon={faCamera} />
    </div>  

    <div className="icon mp3">
    <FontAwesomeIcon className="camera_button" icon={faHeadphones} />
    </div>    

    <div className="icon chat">
    <FontAwesomeIcon className="camera_button" icon={faCommentDots} />
    </div>    

     <div className="icon upload" onClick={openVideo} >
    <FontAwesomeIcon className="camera_button" icon={faVideo} />
    </div>  
     
    {/* All tools */}
    {isCameraOpen && <Camera/>}  
   {isVideoOpen && <Video onClose={closeVideo}/>}
    </div>
  );
}

export default Toolbar;