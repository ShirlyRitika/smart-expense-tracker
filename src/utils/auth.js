// Backend API URL
const API = "http://localhost:5000/api/auth";

// Register user
export const registerUser = async (name, email, password) => {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Register failed");
  }

  return data;
};

// Login user
export const loginUser = async (email, password) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Login failed");
  }

  return data;
};
