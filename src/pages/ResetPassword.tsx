import { useEffect, useState, type SubmitEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { resetPassword } from '../api/resetPassword'
import { ApiError } from '../api/apiHandler'
type Purpose = 'invite' | 'password_reset'
type Status = 'invalid' | 'ready' | 'submitting' | 'done'

const COPY: Record<Purpose, { title: string; intro: string; button: string; done: string }> = {
  invite: {
    title: 'Welcome to Legends',
    intro: 'Set a password to activate your account.',
    button: 'Activate account',
    done: 'Your account is ready. Sign in to start booking classes.',
  },
  password_reset: {
    title: 'Reset password',
    intro: 'Choose a new password for your account.',
    button: 'Save password',
    done: 'Your password has been updated. Sign in with your new password.',
  },
}

const MIN_LENGTH = 8

export function SetPasswordPage({ purpose }: { purpose: Purpose }) {
  const copy = COPY[purpose]
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [token] = useState(() => searchParams.get('token'))

  const [status, setStatus] = useState<Status>(token ? 'ready': 'invalid')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Remove the token from the address bar / history
  useEffect(() => {
    if (token) navigate({ search: '' }, { replace: true })
  }, [token, navigate])


  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if(!token){
        return;
    }
    setError(null)

    if (password.length < MIN_LENGTH) {
      setError(`Password must be at least ${MIN_LENGTH} characters.`)
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setStatus('submitting')
       try{
        await resetPassword(token, password, purpose)
        setStatus('done')
       }catch(err){
        if(err instanceof ApiError && err.status === 410){
            setStatus('invalid')
        }
        else{
            setError((err as Error).message)
            setStatus('ready')
        }
       }
  }

  if (status === 'invalid') {
    return (
      <main className="landing">
        <div className="auth-form">
          <h1>Link expired</h1>
          <p className="form-error" role="alert">
            This link is invalid, has expired, or has already been used.
          </p>
          <Link to="/forgot-password" className="cta">
            Request a new link
          </Link>
        </div>
      </main>
    )
  }
  
  if (status === 'done') {
    return (
      <main className="landing">
        <div className="auth-form">
          <h1>All set!</h1>
          <p>{copy.done}</p>
          {/* TODO: adjust to your sign-in route */}
          <Link to="/login" className="cta">
            Sign in
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="landing">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        <label>
          New password
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            minLength={MIN_LENGTH}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label>
          Confirm password
          <input
            type="password"
            name="confirm"
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
          />
        </label>
        <button type="submit" className="cta" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Saving…' : copy.button}
        </button>
      </form>
    </main>
  )
}

// Route wrappers: one component, two URLs
export const InvitePage = () => <SetPasswordPage purpose="invite" />
export const ResetPasswordPage = () => <SetPasswordPage purpose="password_reset" />

/*
  Routes:
    <Route path="/invite" element={<InvitePage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />
*/