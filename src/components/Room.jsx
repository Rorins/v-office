"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Room({user}) {
  
  function handleClick() {
    router.push(`/${user.data.idroom}`);

  }

  const router = useRouter();

  return (
        <div className="room rounded-lg mb-2" onClick={handleClick}>{user.data.name}</div>
      );
}
