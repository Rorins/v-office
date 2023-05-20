"use client";
import React, { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import getAllData from "@/firebase/firestore/getAllData";
//components
import Room from "@/components/Room";

export default function aside() {
  const { user, setUser } = useAuthContext();
  const router = useRouter();
  const [usersData, setUsersData] = useState([])

 //Retrieve users data
  const getUsers = async () =>{
    const { usersData, error } = await getAllData('users')
    console.log(usersData, "DATA ARRIVED")
    setUsersData(usersData);
  }
 
  
  //Retrieve users data on mounted
  React.useEffect(()=>{
  getUsers()
  }, [])

  const signOut = () => {
    setUser(null);
  };

   // Handle user state change
   React.useEffect(() => {
    if (user === null) {
      router.push("/signin");
      console.log("signed out");
    }
  }, [user]);

//Retrieve data

  return (
    <>
      <aside className="height_100vh w-72 min-h-0 flex-1 flex overflow-hidden">
        <nav
          aria-label="Sidebar"
          className="hidden lg:block flex-shrink-0 bg_primarycolor_shadow overflow-y-auto w-full h-full"
        >
          <img className="logo w-52" src="/logo-top.svg" />
          <div className="room_container flex space-y-10 flex-col mx-4">
            {/* Personal room */}
            {/* <Room /> */}
            {/* Colleagues room */}
            <div className="colleagues_room">
                {usersData.map((user) => (
                    <Room user={user} key={user.id} />
                )
                )}
              {/* <Room />
              <Room /> */}
            </div>
          </div>
          <button onClick={signOut} className="log_out">
          <FontAwesomeIcon
            className="sign_out"
            icon={faArrowRightFromBracket}
          />
          </button>
        </nav>
      </aside>
    </>
  );
}
