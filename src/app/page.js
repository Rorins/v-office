"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import {SiteContext} from "@/context/SiteContext";



export default function Home() {

  const [siteState, setSiteState] = useContext(SiteContext);

  const router = useRouter();

  
  const handleEnterButtonClick = () => {
    router.push("/signin"); // Replace "/signin" with the actual path to your signin page
  };

  return (
    <div className="main_page">
      
      <div className="logo_bg">
      <img  src="/background-logo.svg"/>
      </div>
      {console.log("siteContext", siteState)}
      <div>
      <p>
        Make your office, your home.
      </p>
          <button className="bg-yellow-800 hover:bg-yellow-600  text-white font-bold py-2 px-4 rounded-full"
          onClick={handleEnterButtonClick}
          >
     Enter
    </button>
     </div>

    </div>
  );
}
