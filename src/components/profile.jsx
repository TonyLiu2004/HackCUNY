import React from "react";
import { useAuth } from './UserAuth'

function Profile() {
    const { authUser, userSignOut } = useAuth();

    return (
        <div className="profile-container">
            <img className="profile-icon" src="https://p1.hiclipart.com/preview/843/601/229/avatar-icon-human-icon-person-icon-profile-icon-worker-icon-white-png-clipart.jpg" ></img>

            <div>
                {authUser ? (
                    <>
                        <h4>{`${authUser.email}`}</h4>
                    </>
                ) : (
                    <h4>Guest</h4>
                )}
            </div>

        </div>
    );
}

export default Profile;