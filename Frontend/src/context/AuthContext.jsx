import { createContext, useEffect, useState } from 'react';
import * as authApi from '../api/authApi';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // restore the session when the page loads
  useEffect(() => {
    // TEMPORARY BYPASS FOR UI TESTING
    setAdmin({ name: 'Rashaan', email: 'admin@saffron.com' });
    setLoading(false);
    
    /* --- COMMENTED OUT REAL AUTH ---
    const token = localStorage.getItem('adminToken');
    if (!token) return setLoading(false);
    authApi.me().then(setAdmin).catch(() => localStorage.removeItem('adminToken')).finally(() => setLoading(false));
    */
  }, []);

  const login = async (email, password) => {
    const { token, admin } = await authApi.login(email, password);
    localStorage.setItem('adminToken', token);
    setAdmin(admin);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return <AuthContext.Provider value={{ admin, loading, login, logout }}>{children}</AuthContext.Provider>;
}
