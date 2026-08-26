type HeaderProps = {
  onOpenMenu: () => void
  onOpenAccount: () => void
}

export function Header({ onOpenMenu, onOpenAccount }: HeaderProps) {
  return (
    <header className="site-header">
      <button
        type="button"
        className="icon-button"
        aria-label="Open menu"
        onClick={onOpenMenu}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <p className="brand">Legends</p>
      <button
        type="button"
        className="icon-button icon-button-end"
        aria-label="Open account"
        onClick={onOpenAccount}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="12"
            cy="8"
            r="3.25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M5.5 19.25c1.4-3.1 3.7-4.65 6.5-4.65s5.1 1.55 6.5 4.65"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  )
}
