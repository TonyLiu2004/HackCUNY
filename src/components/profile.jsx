import React from "react";
import { useAuth } from './UserAuth'

function Profile(){
    const { authUser, userSignOut } = useAuth();

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <h4>Guest</h4>
      )}
    </div>
  );
}

export default Profile;