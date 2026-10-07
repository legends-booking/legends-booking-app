import { useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { User } from '../types'

type SignInProps = {
  onSignIn: (user: User) => void
}

export function SignIn({ onSignIn }: SignInProps) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const user: User = {
      id: '',
      role: 'admin',
      name: email.split('@')[0] || 'Member',
      email,
      mobile: '',
      plan: '',
    }
    onSignIn(user)
    navigate('/')
  }

  return (
    <main className="landing">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label>
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" className="cta">
          Sign in
        </button>
      </form>
    </main>
  )
}