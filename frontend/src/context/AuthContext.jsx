import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await fetch('/me');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await fetch('/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({email,password}) });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    setUser(data);
    return data;
  };

  const signup = async (email, password) => {
    const res = await fetch('/signup', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({email,password}) });
    if (!res.ok) throw new Error('Signup failed');
    const data = await res.json();
    setUser(data);
    return data;
  };

  const logout = async () => {
    await fetch('/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() { return useContext(AuthContext); }