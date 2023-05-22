"use client"
import React, {useState} from "react";

import BgCard from "./BgCard";

export default function Options() {

  return (
    <div className="options_modal shadow-2xl">
        <div className="close_modal_button">X</div>
        <div className="bg_selection">
            <h2>Choose your office background</h2>
            <div className="bg_choices">
                <BgCard bgLink={"https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}/>
                <BgCard bgLink={"https://images.unsplash.com/photo-1577017040065-650ee4d43339?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}/>
                <BgCard bgLink={"https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}/>
                <BgCard bgLink={"https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"}/>
                <BgCard bgLink={"https://virtualbackgrounds.site/wp-content/uploads/2020/08/industrial-style-office.jpg"}/>
                <BgCard bgLink={"https://focus.flokk.com/hubfs/Blogs/2021/Zoom%20Meeting%20BAckgrounds/Flokk_Teams-Zoom-Background_Home_03.jpg"}/>
            </div>
        </div>

        <div className="about_selection">
            <h2>Change about you</h2>
<div className="flex">
<section className="checkbox_selection flex">
<div className="flex checkbox p-2 items-center bg-black pl-4 border border-gray-200 rounded dark:border-gray-700">
    <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label for="bordered-checkbox-1" className="w-full py-4 ml-2 text-sm font-medium text-white">Show about you tag to visitors</label>
</div>
</section>

<section className="about_form">
<textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tell your colleagues something about you!"></textarea>
</section>
</div>
<button className="modal_confirm_button">Confirm changes</button>
        </div>
        
    </div>
 )
}