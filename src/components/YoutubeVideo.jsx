import React, { useState } from "react";
import YouTube from "react-youtube";
import firebase_app from "../firebase/config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import Draggable from "react-draggable";

const db = getFirestore(firebase_app);

export default function YoutubeVideo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [videoId, setVideoId] = useState("YB0SqL1A9NU");

  //Options
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
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

  //YOUTUBE SYNC

 // Update video time in Firestore
 const handlePlayerStateChange = async (event) => {
  //info we need to sync youtube
  const currentTime = event.target.getCurrentTime();
  const currentURL = new URL(window.location.href);
  const roomId = currentURL.pathname.substring(1);
  console.log(roomId, "ROOM ID FOR VIDEO");
  console.log(currentTime, "CURRENT TIME");

  try {
    await updateDoc(doc(db, "users", roomId), {
      videoid: videoId,
      currenttime: currentTime,
    });
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

  return (
    //Main Youtube
    <Draggable>
    <div className="youtube_container">
      <YouTube onStateChange={handlePlayerStateChange} videoId={videoId} opts={opts} />
      <div>
        <form onSubmit={handleSearch}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              className="block w-full w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search video"
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-yellow-800 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
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