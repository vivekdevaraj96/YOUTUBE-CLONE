import React from 'react'
import "./_video.scss"
import {AiFillEye} from 'react-icons/ai'
import { useEffect } from 'react'
import axios from 'axios'
import moment from 'moment/moment'
import { useState } from 'react'
import numeral from 'numeral'
import {useHistory} from "react-router-dom"

const Video = ({video}) => {
  const {id,snippet:{channelId, channelTitle, title, publishedAt, thumbnails:{medium}}}=video
  let history = useHistory();
  
  const [views,setViews]=useState(null)
  const [duration,setDuration]=useState(null)
  const [channelIcon, setChannelIcon]=useState(null)
  const _videoId=id?.videoId||id;
  const seconds=moment.duration(duration).asSeconds()
  const _duration=moment.utc(seconds*1000).format("mm:ss")

  useEffect(()=>{   
    try {
      axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails%2Cstatistics&id=${_videoId}&key=AIzaSyDIeipTZZK9UYQlifePJUyddhZZy99kTak`)
      .then((response) => {
          console.log(response.data)
          setDuration(response.data.items[0].statistics.viewCount)
          setViews(response.data.items[0].statistics.viewCount)
      })
  } catch (error) {
      console.log(error)
  }
  },[_videoId])

  useEffect(()=>{   
    try {
      axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=AIzaSyDIeipTZZK9UYQlifePJUyddhZZy99kTak`)
      .then((response) => {
          console.log(response.data)
          setChannelIcon(response.data.items[0].snippet.thumbnails.default)
      })
  } catch (error) {
      console.log(error)
  }
  },[channelId])

  return (
    <div className='video' onClick={()=>history.push(`/watch/${_videoId}`)}>
      <div className='video__top'>
        <img src={medium.url} alt=''/>
        <span>{_duration}</span>
      </div>
      <div className='video__title'>{title}</div>
      <div className='video__details'>
        <span>
          <AiFillEye/> {numeral(views).format("0.a")} Views •
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      <div className='video__channel'>
        <img src={channelIcon?.url} alt=""/>
        <p>{channelTitle}</p>
      </div>
    </div>
  )
}

export default Video