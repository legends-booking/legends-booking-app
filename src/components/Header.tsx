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
    </header>
  )
}
