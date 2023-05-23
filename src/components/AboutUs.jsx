"use client"
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function AboutUs(props) {
    
  return (
    <div className="options_modal aboutus_modal shadow-2xl">
        <div className="about_us">
        <div>
            <h1>About us</h1>
           <h2 className="color_secondary">We happen to be two married developers.</h2> 
           <p className="aurora"><span className="color_secondary">Aurora</span>:I discovered the magical world of coding in my mid twenties,
            I came across an interesting game engine that used Python and from there I was addicted.
            I never considered it a job, I just had so much fun creating games until I came across the incredible world of web development.
            Decided to pursue a coding bootcamp to get my skills recognized and graduated as a Full-stack developer.
            <span>Highly focused on the Front-end with HTML, CSS/SASS,Javascript, React/Next/Gatsby, Vue/Nuxt and PHP, firebase for Back-end.</span>
            To me technology and coding are an incredible art that can not only change the world we live in but it's also a tool that can make any idea and dream come to life.
            </p> 

            <p className="davide">
            <span className="color_secondary">Davide</span>: Graduated in a technical IT institute, IT has always been a part of my life.
            Worked as a Data analyst and sys admin support, I decided to switch to coding.
            I prefer the creative and active role of web development and wish to grow in this career.
            After a coding bootcamp as a Full-stack developer, I specialized myself in <span>HTML,CSS, React/Next and Java on the Back-end.</span>
            </p>

            <div>
                We love to develop applications together, contact us on linkedin with <span className="color_secondary">Aurora Grippaudo and Davide Santonocito</span>. 
            <FontAwesomeIcon
            className="arrow_down"
            icon={faHeart}
            size="2x"
       />
       <div className="us">
       <div className="img_container">
       <img src="/aurora_pc.jpg" />
       </div>
       <div className="img_container">
       <img src="/davide_pc.jpg" />
       </div>
       </div>
            </div>
        </div>
        </div>
         <div>
         <button  onClick={props.onClose}  className="modal_close_button hover:bg-yellow-600">Close</button>
         </div>
        
    </div>
 )
}