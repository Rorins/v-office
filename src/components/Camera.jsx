"use client";
import React, { useState } from "react";
import Webcam from "react-webcam";

export default function Camera() {
  const [webcamPosition, setWebcamPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

  const handleWebcamMouseDown = (event) => {
    setIsDragging(true);
    setDragStartPos({ x: event.clientX, y: event.clientY });
  };

  const handleWebcamMouseMove = (event) => {
    if (!isDragging) return;

    const offsetX = event.clientX - dragStartPos.x;
    const offsetY = event.clientY - dragStartPos.y;

    setWebcamPosition((prevPosition) => ({
      x: prevPosition.x + offsetX,
      y: prevPosition.y + offsetY,
    }));

    setDragStartPos({ x: event.clientX, y: event.clientY });
  };

  const handleWebcamMouseUp = () => {
    setIsDragging(false);
  };
  

  return (
    <div className="webcam_container">
      <Webcam
        imageSmoothing={true}
        audio={false}
        style={{
          position: "absolute",
          left: webcamPosition.x,
          top: webcamPosition.y,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleWebcamMouseDown}
        onMouseMove={handleWebcamMouseMove}
        onMouseUp={handleWebcamMouseUp}
      />
    </div>
  );
}
