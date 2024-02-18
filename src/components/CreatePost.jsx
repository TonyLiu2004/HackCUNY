import React, { useState } from "react";
import { storage, database, auth } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from './UserAuth'
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import './CreatePost.css'

const libraries = ['places']; 
function CreatePost() {
    const { authUser } = useAuth();
    const [userEmail, setUserEmail] = useState("Guest"); 
    const [image, setImage] = useState(null);
    const [event, setEvent] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [eventTime, setEventTime] = useState(""); 
    const API_KEY = import.meta.env.VITE_REACT_GOOGLE_MAPS_KEY;
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries: libraries,
 
    })
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

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
        let address = document.getElementById('locationInput').value;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === 'OK' && results.length > 0) {
              const formattedAddress = results[0].formatted_address;
              console.log('Valid address:', formattedAddress);
              setLocation(formattedAddress);
            } else {
              window.alert('Invalid address');
              return;
            }
        });

        if (!image) {
            window.alert("Please select an image file.");
            return;
        }

        if (location != "") {
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
        }
    };

    const uploadImage = async (imageRef) => {
        await uploadBytesResumable(imageRef, image);
    };

    const addPostToFirestore = async (imageURL) => {
        const datePosted = new Date().toISOString();

        if (authUser.email != "") {
            setUserEmail(authUser.email); 
        }
        await addDoc(collection(database, "posts"), {
            userEmail: authUser.email !== "" ? authUser.email : userEmail,
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
            <h1>Create Post</h1>
            <h1>Create Post</h1>
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
                <Autocomplete>
                    <input
                        type="text"
                        id="locationInput"
                        required
                    ></input>
                </Autocomplete>
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
