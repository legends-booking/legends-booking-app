import type { User } from '../types';
import { setAccessToken } from './jwt';

const BOOKING_SERVICE_URL = import.meta.env.VITE_BOOKING_SERVICE_URL;

export async function userLogin(email: string, password: string): Promise<User> {
  const response = await fetch(`${BOOKING_SERVICE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'Login failed');
  }

  const data: { user: User; token: { accessToken: string, refreshToken: string } } = await response.json();
  console.log('Login successful:', data);
  setAccessToken(data.token.accessToken);
  return data.user;
}