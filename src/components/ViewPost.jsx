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

  return (
    <div className="view-post">
      {post && (
        <>
          <PostCard post={post}/>
        </>
      )}
    </div>
  );
}

export default ViewPost;
