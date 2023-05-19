"use client";
import React from "react";
//components
import Aside from "@/components/Aside";
import Chat from "@/components/Chat";
import Video from "@/components/Video";
import Playlist from "@/components/Playlist";
import Camera from "@/components/Camera";

function Page() {
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

export default Page;
