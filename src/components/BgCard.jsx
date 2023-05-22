"use client"
import React, {useState} from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { SiteContext } from "@/context/SiteContext";
import firebase_app from "@/firebase/config";

export default function BgCard({bgLink}) {


    return (
            <div className="bg_card_container" onClick={() => applyNewBg(bgLink)}>
                <img src={bgLink} />
            </div>
            )
}