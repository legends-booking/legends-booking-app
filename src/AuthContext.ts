import { createContext } from 'react';
import type { User } from './types';

export type Status = 'loading' | 'authenticated' | 'unauthenticated';

export type AuthContextValue = {
  user: User | null;
  status: Status;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);