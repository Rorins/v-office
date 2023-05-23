"use client";
import React, { useState, useContext } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { SiteContext } from "@/context/SiteContext";
import firebase_app from "../firebase/config";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

import getAllData from "@/firebase/firestore/getAllData";
//components
import Room from "@/components/Room";

export default function aside() {

  const db = getFirestore(firebase_app);

  const { user, setUser } = useAuthContext();
  const router = useRouter();

  const [ siteState, setSiteState ] = React.useContext(SiteContext);

  //Retrieve users data
  const getUsers = async () => {
    const { usersData, error } = await getAllData("users");
   
    setSiteState(usersData);
  };

  //Retrieve users data on mounted
  React.useEffect(() => {
    getUsers();
  }, []);

  const signOut = () => {
    setUser(null);
  };

  // Handle user state change
  React.useEffect(() => {
    if (user === null) {
      router.push("/signin");
   
    }
  }, [user]);


  const ToggleAvailability = async (uid) => {

    const currentUser = siteState.find(user => user.id === uid);

    const newStatus = !currentUser.data.status;

    setSiteState(prevSiteState => {
      const newSiteState = (prevSiteState || []).map(obj => {
        if (obj.id === uid) {
          return { ...obj, 
                  data: {
                    ...obj.data,
                  status: newStatus} };
        }
        return obj;
      });
      return newSiteState;
    });
    
// Update database

      try {
        await updateDoc(doc(db, "users", uid), {
           status: newStatus,
        });
      } catch (error) {
        console.error("Error updating user:", error);
      }
    
  }

  //Retrieve data

  return (
    <>
      <aside className="height_100vh w-72 min-h-0 flex-1 flex overflow-hidden">
        <nav
          aria-label="Sidebar"
          className="hidden lg:block flex-shrink-0 bg_primarycolor_shadow w-full h-full"
        >
          <div className="log_out_container">
          <button onClick={signOut} className="log_out">
            <FontAwesomeIcon
              className="sign_out"
              icon={faArrowRightFromBracket}
            />
           
          </button>
          </div>
          
          <img className="logo w-52" src="/logo-top.svg" />
          <div className="room_container flex flex-col mx-4">
            {/* My room */}
            
            <div className="room_section_container">
            <div className="toggle_availability bg-yellow-800 hover:bg-yellow-600 " onClick={() => ToggleAvailability(user.uid)}>Am I available?</div>
            <div className="room_label text-yellow-800">My room</div>
              <div className="my_room">
                {user &&
                  siteState
                    .filter((singleUser) => singleUser.id === user.uid)
                    .map((filteredUser) => (
                      <Room user={filteredUser} key={user.id} myRoom={true} />
                    ))}
              </div>
            </div>
            {/* Colleagues room */}
            <div className="colleague_label">Colleagues room</div>
            <div className="colleague_section_container">
              <div className="colleagues_room">
                {user &&
                  siteState
                    .filter((singleUser) => singleUser.id !== user.uid)
                   .map((filteredUser) => (
                      <Room user={filteredUser} key={user.id} myRoom={false}/>
                    ))}
              </div>
            </div>
          </div>
         
        </nav>
      </aside>
    </>
  );
}
