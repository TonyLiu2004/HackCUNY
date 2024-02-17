import React from 'react'
import './Events.css'
import LeftBar from './leftBar';
import ReadPost from './ReadPosts';

function Events(){
    return(
        <div className='event-page'>
            <LeftBar/>
            <ReadPost/>
        </div>
    )
}

export default Events;