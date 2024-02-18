import React from "react";
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
      <div id="post-title">{event}</div>
      <div id ="title-box">
        <div className = "user-content">{new Date(datePosted).toLocaleString()}</div>
        <div className = "user-content"> {userEmail}</div>
      </div>
      <div className = "img-box">
        <img className='post-image' src={imageURL} alt="Event" />
      </div>
      <div className = "text-content">
        <span className = "bold">Location: </span> 
        {location}
      </div>
      {eventTime && <div className = "text-content"><span className = "bold">Event Time: </span> {new Date(eventTime).toLocaleString()}</div>}
      <div className = "text-content">
        {description}
      </div>
    </div>
  );
}

export default PostCard;
