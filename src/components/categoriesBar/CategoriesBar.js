import React, { useState } from 'react'
import "./_categoriesBar.scss"
import axios from 'axios'

const keywords = [
  'All',
  'React js',
  'Angular js',
  'React Native',
  'use of API',
  'Redux',
  'Music',
  'Algorithm Art ',
  'Guitar',
  'Bengali Songs',
  'Coding',
  'Cricket',
  'Football' ,
  'Webseries',
  'Tamil Songs',
  'Bikes'
]


const CategoriesBar = ({setVideos}) => {
  const [activeElement, setActiveElement]=useState("All")
  const handleClick=(value)=>{
    setActiveElement(value)
    try {
      axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=48&q=${value}&type=video&key=AIzaSyDIeipTZZK9UYQlifePJUyddhZZy99kTak`)
      .then((response) => {
          console.log(response.data)
      setVideos(response.data.items)
    }
      )
  } catch (error) {
      console.log(error)
  }
  }
  return (
    <div className='categoriesBar'>
      {
        keywords.map((value,i)=><span 
        onClick={()=>handleClick(value)}
        className={activeElement === value? 'active' : ''}
        key={i}>{value}</span>)
      }
    </div>
  )
}

export default CategoriesBar