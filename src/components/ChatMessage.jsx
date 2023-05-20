"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function ChatMessage(props) {
    const { user, setUser } = useAuthContext();
    const{text, uiduser} = props.message

   let uid;
    if (user && user.uid !== null) {
        uid = user.uid;
    }
    
    const messageType = uiduser === uid ? 'sent' : 'received';
  
  return (
    <div className= {`message ${messageType}`}>
       <p>{text}</p>
    </div>
 )
}