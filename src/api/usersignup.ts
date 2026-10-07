import type { User } from "../types"

const VITE_BOOKING_SERVICE_URL = import.meta.env.VITE_BOOKING_SERVICE_URL
export async function createUser(body: Record<string, string>): Promise<{user: User, token: string}> {
    const response = await fetch(`${VITE_BOOKING_SERVICE_URL}/members`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if(!response.ok){
        throw new Error('Failed to create user')
    }
    return response.json()
}

export async function getUsers(): Promise<User[]> {
    const response = await fetch(`${VITE_BOOKING_SERVICE_URL}/members`)
    return response.json()
}

// export async function getUser(id: string): Promise<User> {
//     const response = await fetch(`${BOOKING_SERVICE_URL}/users/${id}`)
//     return response.json()
// }