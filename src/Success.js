import React from "react";

const Success = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-12 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Registration successful!</h2>
        <p className="text-gray-600">
          You can now log in with your registered email and password.{" "}
          <a href="/" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Success;
