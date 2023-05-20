"use client";
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCommentDots, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
//Components
import Camera from "@/components/Camera";
import YouTubeVideo from "@/components/YoutubeVideo";

function Toolbar() {
//tool triggers
const [isCameraOpen, setIsCameraOpen] = useState(false);

const openCamera = () => {
    setIsCameraOpen(true);
  };

  // const videoId = "GaCm79Zv3c0";



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

     <div className="icon upload" >
    <FontAwesomeIcon className="camera_button" icon={faYoutube} />
    </div>  
     
    {/* All tools */}
    {isCameraOpen && <Camera/>}  
    <YouTubeVideo />
    </div>
  );
}

export default Toolbar;