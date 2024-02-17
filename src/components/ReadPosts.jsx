import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";

function ReadPost() {
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Query 'posts' collection
                const querySnapshot = await getDocs(collection(database, "posts"));
                
                // Log each post
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                });
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            
        </div>
    );
}

export default ReadPost;
