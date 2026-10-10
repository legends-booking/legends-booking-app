import type { Membership } from "../types";
import { api } from "./jwt";
  
 export async function getMemberships(): Promise<Membership[]> {
  const response = await fetch(`${import.meta.env.VITE_BOOKING_SERVICE_URL}/membership-plans`)
  if (!response.ok) {
    throw new Error('Failed to fetch memberships')
  }
  return response.json();
}


export async function createMembership(body: FormData): Promise<Membership> {
  const response = await api('/membership-plans', {
    method: 'POST',
    body
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error)
  }
  return data
}

