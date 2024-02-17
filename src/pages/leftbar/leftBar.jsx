import React from 'react'

export default function LeftBar() {
    return (
        <div classname = 'leftBar'>
            <div className="left-container">
                <div className="menu">
                    {/* link to profile id*/} 
                    <Link to=''>
                        <div className="user">
                            {/* img of current user (import current user component), have placeholder img for now*/} 
                            <img src="" alt="" />
                            <h4>Username</h4>
                        </div>
                    </Link>

                    <Link to='/'>
                        {/* menu item 1*/} 
                        <div className="item">
                            <img src="" alt="" />
                            <h4>Your Posts</h4>
                        </div>
                    </Link>

                    <Link to='/'>
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
                <div className="create-btn"></div>
            </div>
        </div>
    )
}