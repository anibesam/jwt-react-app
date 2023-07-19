// src/Profile.js

import React from "react";
import { decodeToken } from "./authService";

const Profile = () => {
  // Assuming the user is logged in, decode the JWT token to get the user's data
  const token = localStorage.getItem("token");
  const userProfile = decodeToken(token);

  return (
    <div className="profile">
      <h2>Welcome, {userProfile.name}</h2>
      <p>Email: {userProfile.email}</p>
      <h3>Photos</h3>
      <div className="carousel">
        {/* Display user's photos in a carousel */}
        {userProfile.photos.map((photoUrl) => (
          <img key={photoUrl} src={photoUrl} alt="User Photo" />
        ))}
      </div>
    </div>
  );
};

export default Profile;


