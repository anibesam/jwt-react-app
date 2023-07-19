import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { register } from "./authService";

const Register = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photos: [],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const { files } = e.target;
    const photosArray = Array.from(files);

    setFormData((prevFormData) => ({ ...prevFormData, photos: photosArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    register(formData)
      .then((user) => {
        console.log("Registered successfully. User:", user);
        // Reset the form after successful registration
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          photos: [],
        });
        setErrors({});
        // Navigate to the success page after successful registration
        navigate("/success");
      })
      .catch((errors) => {
        console.log("Registration errors:", errors);
        setErrors(errors);
      });
  };





  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-indigo-500 text-center text-[30px] font-sans font-bold">
            JWT REACT APP
          </h2>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.firstName ? "ring-red-500" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              {errors.firstName && (
                <p className="mt-2 text-red-500 text-xs">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.lastName ? "ring-red-500" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              {errors.lastName && (
                <p className="mt-2 text-red-500 text-xs">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.email ? "ring-red-500" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.password ? "ring-red-500" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="photos"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photos (Select at least 4 photos)
              </label>
              <div className="mt-2">
                <input
                  id="photos"
                  name="photos"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  required
                  className={`block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.photos ? "ring-red-500" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  onChange={handlePhotoChange}
                />
              </div>
              {errors.photos && (
                <p className="mt-2 text-red-500 text-xs">{errors.photos}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
