import React from 'react'
import "./Navbar.css";

function Navbar() {
    return(
        <nav id="nav-container">
            <div className='navLink'>Home</div>
            <div className='navLink'>Sign In</div>
            <div className='navLink'>Map</div>
        </nav>
    )
}

export default Navbar;