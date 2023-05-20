"use client";
import React from "react";
//components
import Aside from "@/components/Aside";
import Chat from "@/components/Chat";
import Video from "@/components/Video";
import Playlist from "@/components/Playlist";
import Toolbar from "@/components/Toolbar";

function Page() {
  return (
    <div className="main">
      <Aside />
      <Toolbar />
      <Chat />
      <Video />
      <Playlist />
    </div>
  );
}

export default Page;
