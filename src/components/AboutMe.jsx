"use client";
import React, { useState } from "react";
import Draggable from "react-draggable";

export default function AboutMe({description, username}) {
  
  return (
    <Draggable>
    <div  className="description">
    <span className="title">About {username}</span>
    <div className="description_box">
    <p>
    {description}
    </p>
    </div>
    </div>
    </Draggable>
  );
}
