"use client"
import React, { useState, useEffect , useRef} from "react";
import YouTube from "react-youtube";
import firebase_app from "../firebase/config";
import { useAuthContext } from "@/context/AuthContext";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { parse } from 'url';
import Draggable from "react-draggable";
import checkRoom from '@/firebase/auth/checkRoom'

const db = getFirestore(firebase_app);

export default function YoutubeVideo() {
  const { user, setUser } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [videoId, setVideoId] = useState("YB0SqL1A9NU");
  const [currentTime, setCurrentTime] = useState(0);
  const [isThisMyRoom, setIsThisMyRoom] = useState();
  const [player, setPlayer] = useState(null); // Store the player instance

  const intervalRef = useRef(null); // Ref to hold the interval reference
  // ...

  // My Room check
  const myRoomCheck = async () => {
    const currentURL = parse(window.location.href);
    const roomId = currentURL.pathname.substring(1);
    const { uid } = user;
    setIsThisMyRoom(await checkRoom(uid, roomId)); // Wait for the checkRoom function to resolve
  };

  useEffect(() => {
    myRoomCheck();
    initializeOpts();
  }, []);

  // Options
  let opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  const initializeOpts = async () => {
    const currentURL = parse(window.location.href);
    const roomId = currentURL.pathname.substring(1);
    if (!isThisMyRoom) {
      try {
        const docRef = doc(db, "users", roomId);
        const docSnapshot = await getDoc(docRef);
  
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const videostate = data.videostatus;
        
          opts = {
            height: "390",
            width: "640",
            playerVars: {
              autoplay: videostate === "play" ? 1 : 0,
            },
          };
        }
      } catch (error) {
        console.error("Error retrieving document:", error);
      }
    }
  };

  // ...

  // YOUTUBE SYNC

  // Update video time in Firestore
  const handlePlayerStateChange = async (event) => {
    const player = event.target;
    const newCurrentTime = player.getCurrentTime();
    let newVideostate;
  
    const currentURL = new URL(window.location.href);
    const roomId = currentURL.pathname.substring(1);
  
    if (isThisMyRoom) {
      if (event.data === window.YT.PlayerState.PLAYING) {
        newVideostate = "play";
      } else if (event.data === window.YT.PlayerState.PAUSED) {
        newVideostate = "pause";
      } else {
        newVideostate = "stop";
      }
  
      if (newVideostate === "play") {
        intervalRef.current = setInterval(async () => {
          const currentTime = player.getCurrentTime();
          await updateDoc(doc(db, "users", roomId), {
            currenttime: currentTime,
          });
        }, 1500);
      } else {
        clearInterval(intervalRef.current);
      }
  
      try {
        const docRef = doc(db, "users", roomId);
        const docSnapshot = await getDoc(docRef);
  
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const storedCurrentTime = data.currenttime;
          setCurrentTime(storedCurrentTime);
        }
      } catch (error) {
        console.error("Error retrieving document:", error);
      }
  
      // Update the current time in Firestore
      try {
        await updateDoc(doc(db, "users", roomId), {
          videoid: videoId,
          currenttime: newCurrentTime,
          videostatus: newVideostate,
        });
        console.log("Document updated successfully");
      } catch (error) {
        console.error("Error updating document:", error);
      }
    } else {
      try {
        const docRef = doc(db, "users", roomId);
        const docSnapshot = await getDoc(docRef);
  
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const ownerVideoStatus = data.videostatus;
  
          if (ownerVideoStatus === "play") {
            player.playVideo();
          } else if (ownerVideoStatus === "pause") {
            player.pauseVideo();
          } else if (ownerVideoStatus === "stop") {
            player.stopVideo();
          }
        }
      } catch (error) {
        console.error("Error retrieving document:", error);
      }
    }
  };

  useEffect(() => {
    if (!isThisMyRoom) {
      intervalRef.current = setInterval(async () => {
        const currentURL = new URL(window.location.href);
        const roomId = currentURL.pathname.substring(1);
        const docRef = doc(db, "users", roomId);
  
        try {
          const snapshot = await getDoc(docRef); // Declare a separate variable to capture the snapshot
          if (snapshot.exists()) {
            const data = snapshot.data();
            const ownerVideoStatus = data.videostatus;

            if (ownerVideoStatus === "play") {
              player.playVideo();
            } else if (ownerVideoStatus === "pause") {
              player.pauseVideo();
            } else if (ownerVideoStatus === "stop") {
              player.stopVideo();
            }
          }
        } catch (error) {
          console.error("Error retrieving document:", error);
        }
      }, 2000); // Adjust the interval duration as needed
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isThisMyRoom, player]); // Include player in the dependency array


  const handlePlayerReady = async (event) => {
    setPlayer(event.target); // Store the player instance
    if (!isThisMyRoom) {
      const currentURL = parse(window.location.href);
      const roomId = currentURL.pathname.substring(1);
  
      try {
        const docRef = doc(db, "users", roomId);
        const docSnapshot = await getDoc(docRef);
  
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const videostate = data.videostatus;
          const storedCurrentTime = data.currenttime;
  
          if (videostate === "play") {
            event.target.seekTo(storedCurrentTime); // Seek the player to the stored current time
            setTimeout(() => {
              event.target.playVideo(); // Start playing the video after a small delay
            }, 500);
          }
        }
      } catch (error) {
        console.error("Error retrieving document:", error);
      }
    }
  };

  // ...

  return (
    // Main Youtube
    <Draggable>
      <div className="youtube_container">
        <YouTube
          onStateChange={handlePlayerStateChange}
          videoId={videoId}
          opts={opts}
          onReady={handlePlayerReady} // Call handlePlayerReady when the player is ready
        />
        {/* ... */}
      </div>
    </Draggable>
  );
}