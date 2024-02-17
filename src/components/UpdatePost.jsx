import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { storage, database } from "../firebase";
import { ref, deleteObject, uploadBytesResumable, getDownloadURL} from "firebase/storage";

function UpdatePost() {
  const { id } = useParams(); // Get the post ID from URL parameter
  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    event: "",
    location: "",
    eventTime: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(database, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
          setFormData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    try {
      const docRef = doc(database, "posts", id);
  
      // Check if there's a new image to upload
      if (image) {
        // Delete the previous image in storage if it exists
        if (post.imageURL) {
          const prevImageRef = ref(storage, post.imageURL);
          await deleteObject(prevImageRef);
        }
  
        // Upload the new image to Firebase Storage
        const imageRef = ref(storage, `images/${image.name}`);
        const newImageURL = await uploadImage(imageRef);
  
        // Update imageURL in formData directly
        formData.imageURL = newImageURL;
      }
  
      // Update the post document in Firestore
      await updateDoc(docRef, formData);
      console.log("Post updated successfully!");
      window.alert("Post updated successfully!");
      window.location.href = '/your-posts'; 
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  
  
  const uploadImage = async (imageRef) => {
    // Upload the image to Firebase Storage
    await uploadBytesResumable(imageRef, image);
  
    // Get download URL for the uploaded image
    return await getDownloadURL(imageRef);
  };

  return (
    <div>
      <h2>Update Post</h2>
      {post && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="event">Event:</label>
          <input
            type="text"
            id="event"
            name="event"
            value={formData.event}
            onChange={handleInputChange}
          />
          <label htmlFor="image">Image:</label>
          <input 
            type="file" 
            id="image" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
          <label htmlFor="eventTime">Event Time:</label>
          <input
            type="datetime-local"
            id="eventTime"
            name="eventTime"
            value={formData.eventTime}
            onChange={handleInputChange}
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <button type="submit">Update Post</button>
        </form>
      )}
    </div>
  );
}

export default UpdatePost;
