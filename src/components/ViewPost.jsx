import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../firebase";
import PostCard from "./PostCard";
function ViewPost() {
  const { id } = useParams(); // Get the post ID from URL parameter
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(database, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  console.log(post);
  return (
    <div className="view-post" style={{height:"100vh", width:"70vw", paddingLeft:"15vw", margin:"0 auto", paddingTop:"100px"}}>
      {post && (
        <div id="post-container" style={{display:"flex", flexDirection:"column"}}>
          <div id="post-title" style={{}}>{post.event}</div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between", width:"98%", paddingLeft:"1vw", paddingTop:"15px"}}>
            <div>{new Date(post.datePosted).toLocaleString()}</div>
            <div>{post.userEmail}</div>
          </div>
          <img style={{paddingLeft:"1vw"}} src={post.imageURL} alt={post.event} />
          <div style={{paddingTop:"15px", textAlign:"left", paddingLeft:"1vw"}}>Location: {post.location}</div>
          <div style={{paddingTop:"15px", textAlign:"left", paddingLeft:"1vw"}}>{new Date(post.eventTime).toLocaleString()}</div>
          <div style={{paddingTop:"15px", textAlign:"left", paddingLeft:"1vw"}}>{post.description}</div>
        </div>
      )}
    </div>
  );
}

export default ViewPost;
