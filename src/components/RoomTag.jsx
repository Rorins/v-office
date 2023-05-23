"use client";
import React, { useState } from "react";
import Draggable from "react-draggable";

export default function RoomTag({username}) {
  
  return (
    <Draggable>
    <div className="room_tag">
    <span className="title">You are in {username}&apos;s room</span>
    </div>
    </Draggable>
  );
}
