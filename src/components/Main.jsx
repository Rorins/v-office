"use client";
import React from "react";
import Aside from "./Aside";
import Chat from "./Chat";
import Video from "./Video";
import Playlist from "./Playlist";
import Camera from "./Camera";

export default function Main() {
  return (
    <div className="main">
      <Aside />
      <Camera />
      <Chat />
      <Video />
      <Playlist />
    </div>
  );
}
