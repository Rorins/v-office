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
        
          opts = { //Adding non clicability as it's not my room and I am visitor
            height: "390",
            width: "640",
            playerVars: {
              autoplay: videostate === "play" ? 1 : 0,
              controls: 0,
            },
          };
        }
      } catch (error) {
        console.error("Error retrieving document:", error);
      }
    }
  };

   //Search videos
   const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCFRuSs9j6E4PF-UWVHzohH3sLoR1VpNX8&q=${searchQuery}&part=snippet&type=video`
    );
    const data = await response.json();
    setSearchResults(data.items);
  };
  //Id handler
  const handleId = (videoId) => {
    setVideoId(videoId);
  };

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
  
  //Visitor youtube check for updates
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

            // check the delay between videos, if it's too much the video will sync again

            let myVideoTime = player.getCurrentTime();
            const delay = myVideoTime - data.currenttime;

            const MAX_DELAY = 4

            if (Math.abs(delay) > MAX_DELAY) {
              player.seekTo(data.currenttime, true);
            }

            // Changing videos if the room owner has already done so

            let currentVideoId = player.getVideoData().video_id;

            if (currentVideoId !== data.videoid) {
              player.loadVideoById(data.videoid);
              player.seekTo(data.currenttime, true);
            }

            // syncing the status of the player between the room owner and visitor

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

      // Visitors can't interact with the room owner youtube.

      event.target.getIframe().style.pointerEvents = "none";

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
      <YouTube onStateChange={handlePlayerStateChange} videoId={videoId} opts={opts}  onReady={handlePlayerReady} onSeek={handlePlayerStateChange}/>
      <div>
        {isThisMyRoom && <form onSubmit={handleSearch}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block outline-orange-600  w-full w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-orange-600 focus:border-orange-600 "
              placeholder="Search video"
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-yellow-800 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </form>}
        {/* Display search results */}
        <div>
          {searchResults.map((result) => (
            <div className="result"  onClick={() => handleId(result.id.videoId)} key={result.id.videoId}>
              <h3>{result.snippet.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Draggable>
  );
}

