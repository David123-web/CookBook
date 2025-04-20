import React, { createContext, useContext, useState, useEffect } from 'react';
import { signupAPI, loginAPI } from '../api/auth'; // make sure you export these
// e.g. loginAPI({ email, password }) => fetch('/login', …)

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch /me to initialize or refresh current user
  const refreshUser = async () => {
    try {
      const res = await fetch('api/me', {
        credentials: 'include', // include cookies for session
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  // On mount, load the current user
  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  // Login: expects { email, password }
  const login = async ({ email, password }) => {
    const data = await loginAPI({ email, password }); 
    // loginAPI should POST /login and return the user object
    setUser(data);
    return data;
  };

  // Signup: expects the full user object
  const signup = async (creds) => {
    const data = await signupAPI(creds);
    // signupAPI POSTs to /signup with { firstName, lastName, … }
    setUser(data);
    return data;
  };

  const logout = async () => {
    await fetch('/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}