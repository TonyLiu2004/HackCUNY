import React, { useEffect, useState } from "react";
import './PostCard.css';

function PostCard({ post }) {
  const {
    userEmail,
    event,
    location,
    eventTime,
    imageURL,
    description,
    datePosted,
  } = post;

  return (
    <div className="post-card">
      <div className = "user-content"> {userEmail}</div>
      <div className = "img-box">
        <img className='post-image' src={imageURL} alt="Event" />
      </div>
      <div className = "text-content">
        <span class = "bold">Event: </span> 
        {event}
        </div>
      <div className = "text-content">
        <span className = "bold">Location: </span> 
        {location}
      </div>
      {eventTime && <div className = "text-content"><span className = "bold">Event Time: </span> {new Date(eventTime).toLocaleString()}</div>}
      <div className = "text-content">
        <span className = "bold">Description: </span> 
        {description}
      </div>
      <div className = "text-content">
        <span className = "bold">Date Posted: </span>
        {new Date(datePosted).toLocaleString()}
        </div>
    </div>
  );
}

export default PostCard;
