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
    <div className="post-card" >
      <h3 id="post-title" className="text-content">{event}</h3>
      <div id="post-date" className="text-content">{new Date(datePosted).toLocaleString()}</div>
      <div className="img-box">
        <img className="post-image" src={imageURL} alt="Event" />
      </div>
      <div className="user-content">{userEmail}</div>
      <div className="text-content">Location: {location}</div>
      {eventTime && <div className="text-content">Event Time: {new Date(eventTime).toLocaleString()}</div>}
      <div id="post-description" className="text-content">{description}</div>
    </div>
  );
}

export default PostCard;
