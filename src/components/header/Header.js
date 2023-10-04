import React from 'react'
import "./_header.scss"

import {FaBars} from "react-icons/fa"
import {AiOutlineSearch} from "react-icons/ai"
import {MdNotifications, MdApps} from "react-icons/md"
import axios from 'axios'
import { useState } from 'react'


const Header = ({handleToggleSidebar, setVideos}) => {
  const [inputText, setInputText] = useState("");
  const handleClick=(value,event)=>{   
    event.preventDefault()
    try {
      axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${value}&type=video&key=AIzaSyDIeipTZZK9UYQlifePJUyddhZZy99kTak`)
      .then((response) => {
          console.log(response.data)
      setVideos(response.data.items)
    }
      )
  } catch (error) {
      console.log(error)
  }
  setInputText("")
  }
  return (
    <div className='border border-dark header'>
      <FaBars className='header__menu' size={26}
      onClick={()=>handleToggleSidebar()}/>
      <img src="http://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" className='header__logo'/>

    <form>
      <input type="text" placeholder='Search' value={inputText} onChange={(event)=>setInputText(event.target.value)}/>
      <button type="submit" onClick={(e)=>handleClick(inputText,e)}><AiOutlineSearch size={22}/></button>
    </form>

    <div className='header__icons'>
      <MdNotifications size={28}/>
      <MdApps size={28}/>
      <img src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" alt="avatar"/>
    </div>

    </div>
  )
}

export default Header