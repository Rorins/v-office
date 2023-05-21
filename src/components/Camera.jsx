"use client";
import React, { useState } from "react";
import Webcam from "react-webcam";
import Draggable from "react-draggable";

export default function Camera() {
  

  return (
    <Draggable>
    <div className="webcam_container">
      <Webcam
        imageSmoothing={true}
        audio={false}
      />
    </div>
    </Draggable>
  );
}
