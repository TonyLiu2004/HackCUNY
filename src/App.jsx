import Navbar from './components/Navbar';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Events from './components/Events'
import Map from './components/Map'
import SignIn from './components/SignIn'
import './App.css';
import SignUp from './components/Signup';
import { UserAuth } from './components/UserAuth';
import CreatePost from './components/CreatePost';
import YourPosts from './components/YourPosts'
import LeftBar from './components/leftBar';
function App() {
  return (
    <BrowserRouter>
      <UserAuth>
        <Navbar />
        <LeftBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/map" element={<Map />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/create-post' element={<CreatePost/>} />
          <Route path='/your-posts' element={<YourPosts/>} />
        </Routes>
      </UserAuth>
    </BrowserRouter>
  )
}

export default App
