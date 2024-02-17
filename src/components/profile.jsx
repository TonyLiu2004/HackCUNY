import React from "react";
import { useAuth } from './UserAuth'

function Profile() {
    const { authUser, userSignOut } = useAuth();

    return (
        <div className="profile-container">
            <img className="profile-icon" src="assets\wanderer-profile-icon.png" ></img>

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