import Navbar from './components/Navbar';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Events from './components/Events'
import Map from './components/Map'
import SignIn from './components/SignIn'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/map" element={<Map />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
  </BrowserRouter>
  )
}

export default App
