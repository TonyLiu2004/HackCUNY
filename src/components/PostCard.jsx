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
      <div className="user-content">{userEmail}</div>
      <div className="img-box">
        <img className="post-image" src={imageURL} alt="Event" />
      </div>
      <h3 className="text-content">{event}</h3>
      <div className="text-content">{location}</div>
      {eventTime && <div className="text-content">Event Time: {new Date(eventTime).toLocaleString()}</div>}
      <div className="text-content">{description}</div>
      <div className="text-content">Date Posted: {new Date(datePosted).toLocaleString()}</div>
    </div>
  );
}

export default PostCard;
