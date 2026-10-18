import type { User } from '../types';
import { apiJson } from './apiHandler';

export const createUser = (body: Record<string, string>) =>
  apiJson<{ user: User; token: string }>('/members', { method: 'POST', body });

export const getUsers = () => apiJson<User[]>('/members');