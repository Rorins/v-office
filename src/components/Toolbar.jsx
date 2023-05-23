"use client";
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCommentDots, faIcons, faVideo, faGear, faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
//Components
import Camera from "@/components/Camera";
import Video from "@/components/Video";
import Options from "@/components/Options";
import AboutUs from "@/components/AboutUs";

function Toolbar() {
//tool triggers
const [isCameraOpen, setIsCameraOpen] = useState(false);
const [isAboutUs, setIsAboutUs] = useState(false);
const [isVideoOpen, setIsVideoOpen] = useState(false);
const [isOptionsOpen, setIsOptionsOpen] = useState(false);

//Camera
const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const openAboutUs = () => {
    setIsAboutUs(true);
  };

  const closeAboutUs= () => {
    setIsAboutUs(false);
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

    <div onClick={openAboutUs}  className="icon chat">
    <FontAwesomeIcon className="camera_button" icon={faCircleQuestion} />
    </div>    

     <div className="icon video" onClick={openVideo} >
    <FontAwesomeIcon className="camera_button" icon={faVideo} />
    </div>  
     
    {/* All tools */}
    {isAboutUs && <AboutUs onClose={closeAboutUs}/>}  
    {isCameraOpen && <Camera onClose={closeCamera}/>}  
   {isVideoOpen && <Video onClose={closeVideo}/>}
   {isOptionsOpen && <Options />}
    </div>
  );
}

export default Toolbar;