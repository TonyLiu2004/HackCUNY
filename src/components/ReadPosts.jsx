import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { database } from "../firebase";
import PostCard from "./PostCard";
import './ReadPosts.css'
function ReadPost() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState({ field: "datePosted", order: "desc" });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let postQuery = query(collection(database, "posts"));

        // Add sorting options based on sortBy state
        if (sortBy.field === "eventTime") {
          // For eventTime, we need to handle ascending/descending separately because it's a timestamp
          postQuery = query(collection(database, "posts"), orderBy(sortBy.field, sortBy.order));
        } else {
          postQuery = query(collection(database, "posts"), orderBy(sortBy.field, sortBy.order));
        }

        const querySnapshot = await getDocs(postQuery);
        const postData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, [sortBy]); 

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setSortBy({ ...sortBy, [name]: value }); 
  };

  return (
    <div id = "main-container">
      <h1>Posts</h1>
      <div>
        <select id="sortSelect" name="field" value={sortBy.field} onChange={handleSortChange}>
          <option value="datePosted">Sort By: Date Posted</option>
          <option value="eventTime">Sort By: Event Time</option>
        </select>
        <select name="order" value={sortBy.order} onChange={handleSortChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <br/>
      <div className="post-card-container">
        {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      </div>
      
    </div>
  );
}

export default ReadPost;
