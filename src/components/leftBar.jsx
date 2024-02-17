import React from 'react'
import {Link} from 'react-router-dom';
import Profile from './profile';

export default function LeftBar() {
    function createPost () {
        window.location.href = '/create-post'
    }

    return (
        <div className = 'leftBar'>
            <div className="left-container">
                <div className="menu">
                    <Link to=''>
                        <Profile/>
                    </Link>

                    <Link to='/your-posts'>
                        {/* menu item 1*/} 
                        <div className="item">
                            <img src="" alt="" />
                            <h4>Your Posts</h4>
                        </div>
                    </Link>

                    <Link to='/bookmarked'>
                        {/* menu item 2*/} 
                        <div className="item">
                            <img src="" alt="" />
                            <h4>Bookmarked</h4>
                        </div>
                    </Link>

                    <Link to='/'>
                        {/* menu item 3*/} 
                        <div className="item">
                            <img src="" alt="" />
                            <h4>Inbox</h4>
                        </div>
                    </Link>

                </div>
                    <hr />
                <div className="create-btn">
                    <button onClick={createPost}>Create Post</button>
                </div>
            </div>
        </div>
    )
}