import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const ADMIN_CREDENTIALS = [
  // 10 mock admin accounts (email,password)
  { email: "admin1@example.com", password: "admin123" },
  { email: "admin2@example.com", password: "admin123" },
  { email: "admin3@example.com", password: "admin123" },
  { email: "admin4@example.com", password: "admin123" },
  { email: "admin5@example.com", password: "admin123" },
  { email: "admin6@example.com", password: "admin123" },
  { email: "admin7@example.com", password: "admin123" },
  { email: "admin8@example.com", password: "admin123" },
  { email: "admin9@example.com", password: "admin123" },
  { email: "admin10@example.com", password: "admin123" }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = (userObj) => {
    // promote to admin if email matches mock admin list
    const isAdmin = ADMIN_CREDENTIALS.some(a => a.email === userObj.email);
    setUser({ ...userObj, isAdmin });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}