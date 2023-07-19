import React from "react";
import { decodeToken } from "./authService";

const Profile = () => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("jwt_token");

  // Decode the token to get user information
  const decodedToken = decodeToken(token);

  if (!decodedToken) {
    // If there's no valid token, redirect to login page or handle accordingly
    // For simplicity, we'll just show a message here.
    return <div>Token not found. Please log in.</div>;
  }

  // Get user data from the decoded token
  const { name, email } = decodedToken;

  // Retrieve the user data from localStorage or handle accordingly
  const users = JSON.parse(localStorage.getItem("registered_users")) || [];
  const user = users.find((u) => u.email === email);

  if (!user) {
    // If user not found, handle accordingly
    // For simplicity, we'll just show a message here.
    return <div>User not found.</div>;
  }

  // Destructure user data
  const { firstName, lastName, photos } = user;

// Profile.js

// ...
return (
  <div className="p-4">
    {user ? (
      <>
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="text-gray-600">Email: {user.email}</p>

        {Array.isArray(user.photos) && user.photos.length > 0 ? ( // Check if user.photos is an array
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Photos:</h2>
            <div className="grid gap-4 grid-cols-3 mt-2">
              {user.photos.map((photo, index) => (
                <div key={index}>
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Photo {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4">No photos uploaded.</p>
        )}
      </>
    ) : (
      <p>Loading user data...</p>
    )}
  </div>
);
// ...

};

export default Profile;
