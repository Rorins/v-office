"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Room({user, myRoom}) {

//Change rooms
  function navigateRoom() {
    if(user.data.status){
      router.push(`/${user.data.idroom}`);
    } else {
      if (!myRoom) {
        alert(`${user.data.name} is busy now, they may be free later.`)
      } else {
        router.push(`/${user.data.idroom}`);
      }
      
    }
  }

  const router = useRouter();
  const availabilityType = user.data.status ? 'enter_box' : 'busy_box';

  return (
        <div className="room rounded-lg mb-2" onClick={navigateRoom}>
          <img className="background" src={user.data.bgroom} >
          </img>
          <h2 className="tag name">{user.data.name}</h2>
          <h2 className={`tag status ${availabilityType}`}>{user.data.status ? "Enter" : "Busy"}</h2>
        </div>
      );
}
