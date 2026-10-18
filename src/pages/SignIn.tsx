import { useState, type SubmitEvent } from 'react'
import { useAuth } from '../useAuth'
import {useNavigate}  from 'react-router-dom'


export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth();
  const navigate = useNavigate()

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <main className="landing">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        {error ?<p className="form-error" role="alert">{error} </p>:null}
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