'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
function Page() {
    const { user , setUser} = useAuthContext()
    const router = useRouter()

    const signOut = () =>{
     setUser(null)
     if (user == null) router.push("/signin")
     console.log("signed out")
    }

    return (
    <div>
        <h1>Only logged in users can view this page</h1>
        <button onClick={signOut} >BUTTON</button>
    </div>);
}

export default Page;
