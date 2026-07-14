const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7172/api";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Login failed");
  }
  return res.json(); // expect { token, user }
}

export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Register failed");
  }
  return res.json();
}
