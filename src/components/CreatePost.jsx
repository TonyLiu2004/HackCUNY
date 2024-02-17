import React, { useState } from "react";
import { storage, database, auth } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from './UserAuth'

function CreatePost() {
    const { authUser } = useAuth();
    const [userEmail, setUserEmail] = useState("Guest"); 
    const [image, setImage] = useState(null);
    const [event, setEvent] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [eventTime, setEventTime] = useState(""); 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
        } else {
            setImage(null);
            window.alert("Please select a valid image file.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            window.alert("Please select an image file.");
            return;
        }

        // Upload image to Firebase Storage
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadImage(imageRef);

        // Get download URL for the uploaded image
        const imageURL = await getDownloadURL(imageRef);

        // Add post data to Firestore
        await addPostToFirestore(imageURL);

        // Reset form fields
        setImage(null);
        setEvent("");
        setLocation("");
        setDescription("");
        setEventTime("");

        window.alert("Post created successfully!");
        window.location.href = '/'; 
    };

    const uploadImage = async (imageRef) => {
        await uploadBytesResumable(imageRef, image);
    };

    const addPostToFirestore = async (imageURL) => {
        const datePosted = new Date().toISOString();

        if (authUser) {
            setUserEmail(authUser.email); 
        }
        await addDoc(collection(database, "posts"), {
            userEmail,
            event,
            location,
            description,
            imageURL,
            datePosted,
            eventTime, 
        });
    };

    return (
        <div className="create-post-container">
            <form className="create-form" onSubmit={handleSubmit}>
                <label htmlFor="eventInput">Event:</label>
                <input
                    type="text"
                    id="eventInput"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    required
                />
                <label htmlFor="imageInput">Image:</label>
                <input 
                    type="file" 
                    id="imageInput" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    required 
                />
                <label htmlFor="locationInput">Location:</label>
                <input
                    type="text"
                    id="locationInput"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                <label htmlFor="eventTimeInput">Event Time:</label>
                <input
                    type="datetime-local"
                    id="eventTimeInput"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                />
                <label htmlFor="descriptionInput">Description:</label>
                <input
                    type="text"
                    id="descriptionInput"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default CreatePost;
