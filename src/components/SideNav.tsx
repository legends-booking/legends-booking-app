import { useEffect, useRef } from 'react'

type SideNavProps = {
  open: boolean
  onClose: () => void
}

const LINKS = ['Home', 'Classes', 'Book', 'Account'] as const

export function SideNav({ open, onClose }: SideNavProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  return (
    <aside
      className={`drawer drawer-left${open ? ' is-open' : ''}`}
      aria-hidden={!open}
      aria-labelledby="menu-title"
      role="dialog"
      aria-modal={open}
      inert={!open}
    >
      <div className="drawer-header">
        <p id="menu-title" className="drawer-title">
          Menu
        </p>
        <button
          ref={closeRef}
          type="button"
          className="icon-button"
          aria-label="Close menu"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
      <nav className="drawer-nav" aria-label="Main">
        {LINKS.map((label) => (
          <button key={label} type="button" className="drawer-link" onClick={onClose}>
            {label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}
