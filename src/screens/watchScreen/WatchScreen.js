import React from 'react'
import './WatchScreen'
import {useParams} from 'react-router-dom'


const WatchScreen = () => {
    let {id}=useParams()
    const url=`https://www.youtube.com/embed/${id}?autoplay=1`

    return <div className='watchscreen__player'><iframe src={url}
    
    title="myvideo"
    allowFullScreen="true"
 
    height="100vh"
    ></iframe>
    </div>

}

export default WatchScreen