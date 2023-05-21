"use client";
//Check if room is not yours to hide and show things
//will be true or false

export default function checkRoom(currentUser, room){
    return currentUser === room
}
