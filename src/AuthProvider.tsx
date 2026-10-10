import { useEffect, useRef, useState } from 'react';
import type { User } from './types';
import { api, refreshSession, setAccessToken } from './api/jwt';
import { userLogin } from './api/userlogin';
import { AuthContext, type Status } from './AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const started = useRef(false); // avoids the StrictMode double-run in dev

 useEffect(() => {
  if (started.current) return;
  started.current = true;
  (async () => {
    const u = await refreshSession();
    if (!u) return setStatus((s) => (s === 'authenticated' ? s : 'unauthenticated'));
    setUser(u);
    setStatus('authenticated');
  })();
}, []);

  const login = async (email: string, password: string) => {
    const u = await userLogin(email, password); // also sets the access token
    setUser(u);
    setStatus('authenticated');
  };

  const logout = async () => {
    await api('/auth/logout', { method: 'POST' }).catch(() => {});
    setAccessToken(null);
    setUser(null);
    setStatus('unauthenticated');
  };

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}