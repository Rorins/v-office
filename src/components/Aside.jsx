'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function aside() {
    const { user , setUser} = useAuthContext()
    const router = useRouter()

    const signOut = () =>{
     setUser(null)
     if (user == null) router.push("/signin")
     console.log("signed out")
    }
    return (
        <>
         <aside className="height_100vh w-64 min-h-0 flex-1 flex overflow-hidden">
    <nav aria-label="Sidebar" className="hidden lg:block flex-shrink-0 bg_primarycolor_shadow overflow-y-auto w-full h-full">
    <img className="logo w-52" src="/logo-top.svg"/>
        <div className=" w-20 flex space-y-16 flex-col p-3">
            Hello
        </div>
        <FontAwesomeIcon className="sign_out"
         icon={faArrowRightFromBracket}  
         onClick={signOut} />
    </nav>

</aside>
        </>
    )
}