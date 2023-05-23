"use client";
import React, { useState } from "react";
import Webcam from "react-webcam";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Camera(props) {
  
  return (
    <Draggable>
    <div className="webcam_container">
      <Webcam
        imageSmoothing={true}
        audio={false}
      />
      <FontAwesomeIcon
            className="close"
            icon={faCircleXmark}
            size="2x" 
            onClick={props.onClose}
          />
    </div>
    </Draggable>
  );
}
