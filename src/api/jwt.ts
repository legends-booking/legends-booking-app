import type { User } from '../types'; 

let accessToken: string | null = null
export const setAccessToken = (token: string | null) => {
  accessToken = token
}
const BOOKING_SERVICE_URL = import.meta.env.VITE_BOOKING_SERVICE_URL

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const refreshSession = (): Promise<User | null> =>
  navigator.locks.request('refreshSession', async () => {
    try {
      const res = await fetch(`${BOOKING_SERVICE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) { accessToken = null; return null; }
      const data = await res.json();
      accessToken = data.accessToken ?? data.token?.accessToken ?? null;
      return data.user ?? null;
    } catch {
      return null;
    }
  });

export async function api(path: string, init: RequestInit = {}, retry = true): Promise<Response> {
  const res = await fetch(`${BOOKING_SERVICE_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: { ...init.headers, ...(accessToken && { Authorization: `Bearer ${accessToken}` }) },
  });
  if (res.status === 401 && retry && await refreshSession()) return api(path, init, false);
  return res;
}

export async function apiJson<T>(
  path: string,
  { body, ...init }: Omit<RequestInit, 'body'> & { body?: unknown } = {}
): Promise<T> {
  const res = await api(path, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init.headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new ApiError(res.status, data?.error ?? `Request failed (${res.status})`);
  }
  return res.status === 204 ? (undefined as T) : res.json();
}