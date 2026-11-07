import type { Membership } from "../types";
import { apiJson } from "./apiHandler";
  
 export const getMemberships = async (): Promise<Membership[]> => {
  const response = await fetch(`${import.meta.env.VITE_BOOKING_SERVICE_URL}/membership-plans`)
  if (!response.ok) {
    throw new Error('Failed to fetch memberships')
  }
  return response.json();
}


export const createMembership = (body: FormData) =>
  apiJson<Membership>('/membership-plans',{method: 'POST', body})

