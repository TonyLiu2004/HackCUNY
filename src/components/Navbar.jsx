import React from 'react';
import {Link} from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
    return(
        <nav id="nav-container">
            <Link className='navLink' to='/'>Home</Link>
            <div id="nav-center">
                <Link className='navLink' to='/events'>Events</Link>
                <Link className='navLink' to='/map'>Map</Link>
            </div>
            <Link className='navLink' to='/signin'>Sign In</Link>
        </nav>
    )
}

export default Navbar;