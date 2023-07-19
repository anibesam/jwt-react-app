import React, { useEffect, useState } from "react";
import { decodeToken } from "./authService";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("jwt_token");

    // If token is available, decode it to get the user information
    if (token) {
      const decodedUser = decodeToken(token);

      // Set the decoded user data in state
      setUser(decodedUser);
    }
  }, []);

  console.log("User Data:", user);

  return (
    <div className="p-4">
      {user ? (
        <>
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-600">Email: {user.email}</p>

          {user.photos && user.photos.length > 0 ? (
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
};

export default Profile;
