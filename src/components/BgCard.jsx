"use client"
import React, {useState} from "react";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import { useAuthContext } from "@/context/AuthContext";

export default function BgCard({bgLink}) {
    const { user, setUser } = useAuthContext();

    const applyNewBg = async (bgLink) => {
        const { uid } = user;
        const db = getFirestore(firebase_app);
        const userRef = doc(db, "users", uid);
    
        try {
          await updateDoc(userRef, {
            bgroom: bgLink,
          });
        } catch (error) {
          console.error("Error updating user document:", error);
        }
      };

    return (
            <div className="bg_card_container" onClick={() => applyNewBg(bgLink)}>
                <img src={bgLink} />
            </div>
            )
}