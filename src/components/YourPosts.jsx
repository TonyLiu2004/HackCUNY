import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import PostCard from "./PostCard";
import { useAuth } from './UserAuth';
import './YourPosts.css';

function YourPosts() {
    const { authUser } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(database, "posts"));
                const postData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const filteredPosts = postData.filter(post => 
                    post.userEmail === (authUser ? authUser.email : 'Guest'));

                setPosts(filteredPosts);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        };

        fetchPosts();
    }, [authUser]);
    return (
        <div className="your-posts-page">
            <div>
                <h2>Your Posts</h2>
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>

    );
}

export default YourPosts;
