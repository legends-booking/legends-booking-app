import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { User } from '../types'
type SideNavProps = {
  open: boolean
  onClose: () => void,
  user: User | null
}

const LINKS = ['Home', 'Classes', 'Book', 'Account'] as const

type menuLinks ={menu: string, link: string}

const MENU_BY_ROLE: Record<User['role'],menuLinks[]>={
  "customer":[
          {menu:"Bookings",link:"/bookings"},
          {menu:"Account",link:"/profile"}
        ],
  "instructor":[
          {menu:"Bookings",link:"/bookings"},
          {menu:"Account",link:"/profile"}
        ],
  "admin":[
          {menu:"Bookings",link:"/bookings"},
          {menu:"Account",link:"/profile"},
          {menu:"Members",link:"/members"},
          {menu:"Sign Up New User", link:"/signup"}

        ]
}

export function SideNav({ open, onClose, user }: SideNavProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  return (
    <aside
      className={`drawer drawer-left${open ? ' is-open' : ''}`}
      aria-hidden={!open}
      role="dialog"
      aria-modal={open}
      inert={!open}
    >
      <div className="drawer-header">
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
      {user?(<nav className="drawer-nav" aria-label="Main">
      {MENU_BY_ROLE[user.role].map((item) => (
        <button key={item.link} type="button" className="drawer-link" onClick={()=>{
          onClose()
          navigate(item.link)
        }}>
          {item.menu}
        </button>
      ))}
    </nav>)
      :(<button
        type="button"
        className="cta"
        onClick={() => {
          onClose()
          navigate('/login')
        }}
      >
        Sign In
      </button>)}
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
