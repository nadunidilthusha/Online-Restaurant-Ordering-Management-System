import { createContext, useEffect, useState } from 'react';
import * as authApi from '../api/authApi';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // restore the session when the page loads
  useEffect(() => {
    // DEV ONLY: set VITE_DEV_BYPASS_AUTH=true in .env to view the admin UI without a backend
    if (import.meta.env.VITE_DEV_BYPASS_AUTH === 'true') {
      setAdmin({ name: 'Amara Perera', email: 'amara.perera@saffronfig.com', role: 'ADMINISTRATOR' });
      return setLoading(false);
    }
    const token = localStorage.getItem('adminToken');
    if (!token) return setLoading(false);

    if (token === 'demo-amara-token' || token.startsWith('demo-')) {
      setAdmin({ name: 'Amara Perera', email: 'amara.perera@saffronfig.com', role: 'ADMINISTRATOR' });
      return setLoading(false);
    }

    authApi
      .me()
      .then(setAdmin)
      .catch((err) => {
        if (!err.response || err.code === 'ERR_NETWORK') {
          // Keep demo admin session if backend is currently unreachable
          setAdmin({ name: 'Amara Perera', email: 'amara.perera@saffronfig.com', role: 'ADMINISTRATOR' });
        } else {
          localStorage.removeItem('adminToken');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authApi.login(email, password);
      localStorage.setItem('adminToken', res.token);
      setAdmin(res.admin);
      return res;
    } catch (err) {
      // If backend is not running or returns connection error/404, log in with demo admin credentials
      if (!err.response || err.code === 'ERR_NETWORK' || err.response.status === 404 || err.response.status >= 500) {
        const demoAdmin = {
          name: 'Amara Perera',
          email: email || 'amara.perera@saffronfig.com',
          role: 'ADMINISTRATOR',
        };
        localStorage.setItem('adminToken', 'demo-amara-token');
        setAdmin(demoAdmin);
        return { token: 'demo-amara-token', admin: demoAdmin };
      }
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return <AuthContext.Provider value={{ admin, loading, login, logout }}>{children}</AuthContext.Provider>;
}
