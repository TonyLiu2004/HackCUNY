import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import PostCard from "./PostCard";
import { useAuth } from './UserAuth';

function YourPosts() {
  const { authUser } = useAuth(); // Access current user
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, "posts"));
        const postData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Filter posts based on userEmail matching currentUser.email or 'Guest'
        const filteredPosts = postData.filter(post => post.userEmail === (authUser ? authUser.email : 'Guest'));
        
        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, [authUser]); // Update posts when authUser changes

  return (
    <div>
      <h2>Your Posts</h2>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default YourPosts;
