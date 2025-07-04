// src/services/auth.js

// Store token
export const loginUser = (token) => {
  localStorage.setItem("token", token);
};

// Remove token
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// Get raw token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Check if logged in
export const isAuthenticated = () => {
  return !!getToken();
};

// ✅ Extract user role from JWT
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || null;
  } catch (err) {
    console.error("Invalid token format", err);
    return null;
  }
};


export function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded; // should contain "sub" and "role"
  } catch {
    return null;
  }
}