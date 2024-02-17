import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './UserAuth'
import "./Navbar.css";

function Navbar() {
    const { authUser, userSignOut } = useAuth();

    return (
        <nav id="nav-container">
            <Link className='navLink' to='/'>Home</Link>
            <div id="nav-center">
                <Link className='navLink' to='/events'>Events</Link>
                <Link className='navLink' to='/map'>Map</Link>
            </div>

            {authUser ? (
                <>
                    <Link className='navLink' onClick={userSignOut}>Sign Out</Link>
                </>
            ) : (
                <Link className='navLink' to='/signin'>Sign In</Link>
            )}

        </nav>
    )
}

export default Navbar;