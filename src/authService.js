// src/authService.js

const users = []; // For storing registered users (Mock data)

export function register(user) {
  // Simulate server-side validation
  const errors = {};
  if (!user.firstName || user.firstName.length < 2 || user.firstName.length > 25) {
    errors.firstName = "First Name must be between 2 and 25 characters";
  }
  if (!user.lastName || user.lastName.length < 2 || user.lastName.length > 25) {
    errors.lastName = "Last Name must be between 2 and 25 characters";
  }
  if (!user.email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(user.email)) {
    errors.email = "Invalid email format";
  }
  if (!user.password || user.password.length < 6 || user.password.length > 50) {
    errors.password = "Password must be between 6 and 50 characters";
  } else if (!containsNumber(user.password)) {
    errors.password = "Password must contain at least one number";
  }
  if (user.photos.length < 4) {
    errors.photos = "Select at least 4 photos";
  }

  if (Object.keys(errors).length > 0) {
    return Promise.reject(errors);
  }

  // Generate a mock user ID (you can use a real ID generator)
  const userId = users.length + 1;
  const newUser = { ...user, id: userId };
  users.push(newUser);

  return Promise.resolve(newUser);
}

export function login(email, password) {
  // Simulate server-side login
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return Promise.reject({ email: "Invalid email or password" });
  }

  const tokenPayload = {
    sub: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 30, // JWT expiration time (30 minutes)
  };

  const token = generateToken(tokenPayload);

  return Promise.resolve(token);
}

function generateToken(payload) {
  return "Bearer " + btoa(JSON.stringify(payload));
}

function isValidEmail(email) {
  // Simple email format validation (Regex can be used for more complex validation)
  return email.includes("@") && email.includes(".");
}

function containsNumber(str) {
  // Check if the string contains at least one number
  return /\d/.test(str);
}

export function decodeToken(token) {
  const decodedPayload = JSON.parse(atob(token.split(" ")[1]));
  return decodedPayload;
}
