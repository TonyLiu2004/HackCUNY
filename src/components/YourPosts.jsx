import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { database } from "../firebase";
import PostCard from "./PostCard";
import { useAuth } from './UserAuth';
import './YourPosts.css';

function YourPosts() {
    const { authUser } = useAuth();
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState({ field: "datePosted", order: "desc" });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let postQuery = query(collection(database, "posts"));

                // Filter posts by userEmail
                const querySnapshot = await getDocs(postQuery);
                const postData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const filteredPosts = postData.filter(post =>
                    post.userEmail === (authUser ? authUser.email : 'Guest'));

                // Add sorting options based on sortBy state
                if (sortBy.field === "eventTime") {
                    // For eventTime, we need to handle ascending/descending separately because it's a timestamp
                    filteredPosts.sort((a, b) => {
                        if (sortBy.order === "asc") {
                            return a.eventTime - b.eventTime;
                        } else {
                            return b.eventTime - a.eventTime;
                        }
                    });
                } else {
                    filteredPosts.sort((a, b) => {
                        if (sortBy.order === "asc") {
                            return a[sortBy.field].localeCompare(b[sortBy.field]);
                        } else {
                            return b[sortBy.field].localeCompare(a[sortBy.field]);
                        }
                    });
                }

                setPosts(filteredPosts);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        };

        fetchPosts();
    }, [authUser, sortBy]);

    const handleSortChange = (e) => {
        const { name, value } = e.target;
        setSortBy({ ...sortBy, [name]: value });
    };

    const handleDeletePost = async (postId) => {
        try {
            await deleteDoc(doc(database, "posts", postId));
            setPosts(posts.filter(post => post.id !== postId));
            console.log("Post deleted successfully!");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleEditPost = (postId) => {
        window.location.href = `/edit/${postId}`;
    };

    return (
        <div className="your-posts-page">
            {/** <LeftBar /> **/}
            <div className="your-posts">
                <h2>Your Posts</h2>
                <div>
                    <select id="sortSelect" name="field" value={sortBy.field} onChange={handleSortChange}>
                        <option value="datePosted">Sort By: Date Posted</option>
                        <option value="eventTime">Sort By:Event Time</option>
                    </select>
                    <select name="order" value={sortBy.order} onChange={handleSortChange}>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
                <div className="post-card-container">
                    {posts.map(post => (
                        <div key={post.id}>
                            <PostCard post={post} />
                            <button onClick={() => handleEditPost(post.id)}>Edit</button>
                            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    );
}

export default YourPosts;
