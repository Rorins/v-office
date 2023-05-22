"use client";
import React, { useState, useRef } from "react";
import firebase_app from "@/firebase/config";
import { collection, query, orderBy, limit, getDoc,  getFirestore ,addDoc, serverTimestamp} from "firebase/firestore";
import { useCollectionData } from "react-firebase9-hooks/firestore";
import getData from "@/firebase/firestore/getData";
import { useAuthContext } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";
//Components
import ChatMessage from "@/components/ChatMessage";

const db = getFirestore(firebase_app);
const messageRef = collection(db, 'chat');
const queryRef = query(messageRef, orderBy('createdAt'), limit(25));

export default function Chat() {
  const { user, setUser } = useAuthContext();
  const [messages] = useCollectionData(queryRef, { idField: 'id' });
  const [formValue,setFormValue] = useState('')
  const [userName, setUserName] = useState('');
  const focus = useRef();

   
  //Retrieve single user data
  const getUser = async () =>{
    const {uid} = user;
    const { result, error } = await getData('users', uid)
    setUserName(result.name);
}

  //Retrieve user name on mounted
  React.useEffect(()=>{
    getUser()
    }, [])


  const sendMessage = async(e) => {
    e.preventDefault()

    const { uid } = user;

    await addDoc(messageRef, {
      text: formValue,
      createdAt: new Date(),
      uiduser: uid,
      userName: userName,
    });

    setFormValue('')
    focus.current.scrollIntoView({ behavior: 'smooth'})
  }
 
  return (
  <Draggable>
  <div className="chatbox ">
    <span className="office_chat">Office Chat</span>
  <div className="messagesbox flex-grow h-64 w-72  overflow-y-auto">
    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}

    <div ref={focus}></div>
  </div>

  <form  onSubmit={sendMessage}>
    <input className="submit" value={formValue} onChange={(e) =>setFormValue(e.target.value)}/>
  <button className="send_button mx-2" type="submit">
  <FontAwesomeIcon
            icon={faPaperPlane}
    />
  </button>
  </form>


  </div>
  </Draggable>)
}
