"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Room({user}) {
  
//Change rooms
  function navigateRoom() {
    if(user.data.status){
      router.push(`/${user.data.idroom}`);
    } else {
      alert(`${user.data.name} is busy now, they may be free later.`)
    }
  }

  const router = useRouter();

  return (
        <div className="room rounded-lg mb-2" onClick={navigateRoom}>
          <img className="background" src={user.data.bgroom} >
          </img>
          <h2 className="tag name">{user.data.name}</h2>
          <h2 className="tag status">{user.data.status ? "Enter" : "Busy"}</h2>
        </div>
      );
}
