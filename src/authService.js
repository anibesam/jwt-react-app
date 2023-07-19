const TOKEN_STORAGE_KEY = "jwt_token"; // Key for storing the token in localStorage
const USERS_STORAGE_KEY = "registered_users"; // Key for storing registered users in localStorage

// Get users from localStorage or use an empty array if none exists
const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || [];

// Placeholder for generateToken function
function generateToken(payload) {
  return "Bearer " + btoa(JSON.stringify(payload));
}

// Existing functions...

export function register(user) {
  // ...

  // Generate a mock user ID (you can use a real ID generator)
  const userId = users.length + 1;
  const newUser = { ...user, id: userId };
  users.push(newUser);

  // Handle photo uploads (you can store the base64 encoded photos)
  if (user.photos && user.photos.length > 0) {
    const uploadedPhotos = handlePhotoUploads(user.photos);
    newUser.photos = uploadedPhotos;
  }

  // Store the updated users array in localStorage
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  // Registration success, store the token
  const tokenPayload = {
    sub: newUser.id,
    name: `${newUser.firstName} ${newUser.lastName}`,
    email: newUser.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 30, // JWT expiration time (30 minutes)
  };

  const token = generateToken(tokenPayload);

  // Store the token in localStorage
  localStorage.setItem(TOKEN_STORAGE_KEY, token);

  // Resolve with the new user
  return Promise.resolve(newUser);
}

export function login(email, password) {
  // Simulate server-side login
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return Promise.reject({ email: "Invalid email or password" });
  }

  // Login success, store the token
  const tokenPayload = {
    sub: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 30, // JWT expiration time (30 minutes)
  };

  const token = generateToken(tokenPayload);

  // Store the token in localStorage
  localStorage.setItem(TOKEN_STORAGE_KEY, token);

  // Resolve with the user
  return Promise.resolve(user);
}

// Existing functions...

// Function to handle photo uploads (store base64 encoded photos)
async function handlePhotoUploads(photos) {
  const base64Promises = photos.map((photo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read the photo."));
      };

      reader.readAsDataURL(photo);
    });
  });

  try {
    const base64Urls = await Promise.all(base64Promises);
    return base64Urls;
  } catch (error) {
    console.error("Error while reading photos:", error);
    return [];
  }
}


export function decodeToken(token) {
  const decodedPayload = JSON.parse(atob(token.split(" ")[1]));
  return decodedPayload;
}

// Other functions remain the same
// ...
