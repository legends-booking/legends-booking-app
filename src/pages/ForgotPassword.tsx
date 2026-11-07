import { useState, type SubmitEvent } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../api/forgotPassword'

type Status = 'idle' | 'submitting' | 'sent'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setStatus('submitting')
    try {
      await forgotPassword(email.trim())
      setStatus('sent')
    } catch (err) {
      setError((err as Error).message)
      setStatus('idle')
    }
  }

  if (status === 'sent') {
    return (
      <main className="landing">
        <div className="auth-form">
          <h1>Check your email</h1>
          <p>
            If an account exists for <strong>{email}</strong>, we've sent a link to reset your
            password.
          </p>
          <Link to="/login" className="cta">
            Back to sign in
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="landing">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Forgot password</h1>
        <p>Enter your email and we'll send you a link to reset your password.</p>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        <label>
          Email
          <input disabled={status === 'submitting'}
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <button type="submit" className="cta" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send reset link'}
        </button>
        <Link to="/login" className="auth-link">
          Back to sign in
        </Link>
      </form>
    </main>
  )
}
