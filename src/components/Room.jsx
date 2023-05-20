"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Room({user}) {
  
//Change rooms
  function handleClick() {
    router.push(`/${user.data.idroom}`);

  }

  const router = useRouter();

  return (
        <div className="room rounded-lg mb-2" onClick={handleClick}>
          <h2>{user.data.name}</h2>
        </div>
      );
}
