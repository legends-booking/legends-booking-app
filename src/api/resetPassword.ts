import { ApiError } from "./apiHandler";

export async function resetPassword(token: string, password: string, purpose: string): Promise<void> {
  let response: Response
  try {
    response = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password, purpose }),
    })
  } catch {
    throw new ApiError(0, 'Could not reach the server. Check your connection and try again.')
  }

  if (response.ok) return

  const errorData = await response.json().catch(() => null)
  const message =
    response.status < 500 && errorData?.error
      ? errorData.error
      : 'Something went wrong. Please try again in a few minutes.'

  throw new ApiError(response.status, message)
}