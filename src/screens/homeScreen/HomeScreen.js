import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CategoriesBar from '../../components/categoriesBar/CategoriesBar'
import Video from '../../components/video/Video'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'



const HomeScreen = ({videos, setVideos}) => {
   
    // const [videos,setVideos]=useState([])
        useEffect(()=>{
            try {
                axios.get('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=48&regionCode=IN&key=AIzaSyDIeipTZZK9UYQlifePJUyddhZZy99kTak')
                .then((response) => {
                    console.log(response.data)
                setVideos(response.data.items)})
            } catch (error) {
                console.log(error)
            }
        },[setVideos])

        const fetchData=()=>{
            // Logic
        }
  return (
    <Container>
        <CategoriesBar videos={videos} setVideos={setVideos}/>
        <Row>
            <InfiniteScroll
            dataLength={videos.length}
            next={fetchData}
            hasMore={true}
            Loader={
                <div className='spinner-border text-danger d-block mx-auto'></div>
            }
            className='row'>
            {
                videos.map((video)=>(
                    <Col lg={3} md={4}>
                        <Video video={video} key={video.id} />
                    </Col>
                ))
            }
            </InfiniteScroll>
        </Row>
    </Container>
  )
}

export default HomeScreen