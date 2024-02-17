import React, { useEffect, useState } from "react";
import { database } from "../firebase"; // Import firestore from firebase
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
      <div>User Email: {userEmail}</div>
      <div>Event: {event}</div>
      <div>Location: {location}</div>
      {eventTime && <div>Event Time: {new Date(eventTime).toLocaleString()}</div>}
      <img className='post-image' src={imageURL} alt="Event" />
      <div>Description: {description}</div>
      <div>Date Posted: {new Date(datePosted).toLocaleString()}</div>
    </div>
  );
}

export default PostCard;
