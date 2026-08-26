import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { User } from '../types'

type AccountPanelProps = {
  open: boolean
  onClose: () => void
  user: User | null
}

export function AccountPanel({ open, onClose , user}: AccountPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  return (
    <aside
      className={`drawer drawer-right${open ? ' is-open' : ''}`}
      aria-hidden={!open}
      aria-labelledby="account-title"
      role="dialog"
      aria-modal={open}
      inert={!open}
    >
      <div className="drawer-header">
        <p id="account-title" className="drawer-title">
          Account
        </p>
        <button
          ref={closeRef}
          type="button"
          className="icon-button"
          aria-label="Close account"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div className="account-body">
        <p className="account-status">You’re not signed in</p>
        <p className="account-copy">
          Sign in to manage bookings and your membership.
        </p>
        {!user?<Link to="/login" className="cta" onClick={() => onClose()}>
          Sign in
        </Link>:null}
      </div>
    </aside>
  )
}
