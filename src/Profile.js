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

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 mx-auto">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Welcome, {firstName} {lastName}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {email}
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Your Photos</h3>
          <div className="grid grid-cols-2 gap-4">
            {photos.map((photo) => (
              <div key={photo.name} className="relative overflow-hidden rounded-lg">
                <img
                  className="w-full h-48 object-cover object-center"
                  src={`data:image/jpeg;base64,${photo.base64Data}`}
                  alt={photo.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
