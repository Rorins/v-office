"use client";
import React, { useState } from "react";
import firebase_app from "@/firebase/config";
import { collection, query, orderBy, limit, getDoc,  getFirestore ,addDoc, serverTimestamp} from "firebase/firestore";
import { useCollectionData } from "react-firebase9-hooks/firestore";
import { useAuthContext } from "@/context/AuthContext";
//Components
import ChatMessage from "@/components/ChatMessage";

const db = getFirestore(firebase_app);
const messageRef = collection(db, 'chat');
const queryRef = query(messageRef, orderBy('createdAt'), limit(25));

export default function Chat() {
  const { user, setUser } = useAuthContext();
  const [messages] = useCollectionData(queryRef, { idField: 'id' });
  const [formValue,setFormValue] = useState('')

  const sendMessage = async(e) => {
    e.preventDefault()

    const { uid } = user;

    await addDoc(messageRef, {
      text: formValue,
      createdAt: new Date(),
      uiduser: uid,
    });

    setFormValue('')
  }
 
  return (
  <div className="chatbox">
  <div className="messagesbox">
    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
  </div>

  <form onSubmit={sendMessage}>
    <input value={formValue} onChange={(e) =>setFormValue(e.target.value)}/>
  <button type="submit">
   submit
  </button>
  </form>


  </div>)
}
