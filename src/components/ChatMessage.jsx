"use client";
import React, {useState} from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function ChatMessage(props) {
    const { user, setUser } = useAuthContext();
    const{text, uiduser, userName} = props.message

   let uid;
    if (user && user.uid !== null) {
        uid = user.uid;
    }
    
    
    
    const messageType = uiduser === uid ? 'sent' : 'received';
  
  return (
    <div className= {`message ${messageType}`}>
      <span className="user_message">{userName}</span>
       <p className="max-w-xs overflow-hidden overflow-ellipsis">
       <span className="whitespace-pre-wrap">{text}</span>
        </p>
    </div>
 )
}