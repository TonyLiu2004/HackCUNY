import React from "react";
import { useAuth } from './UserAuth'
import profile_icon from '../../assets/wanderer-profile-icon.png'

function Profile() {
    const { authUser, userSignOut } = useAuth();

    return (
        <div className="profile-container">
            <img className="profile-icon" src={profile_icon} ></img>

            <div>
                {authUser ? (
                    <>
                        <h4 style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '90px' }}>{`${authUser.email}`}</h4>
                    </>
                ) : (
                    <h4>Guest</h4>
                )}
            </div>

        </div>
    );
}

export default Profile;