import { useCallback, useEffect, useRef, useState } from 'react'
import { AccountPanel } from './components/AccountPanel'
import { Header } from './components/Header'
import { SideNav } from './components/SideNav'
import type { User } from './types'
import { SignIn } from './pages/SignIn'
import { Routes, Route } from 'react-router-dom'





let user: User | null = null

type Panel = 'menu' | 'account' | null

function App() {
  const [panel, setPanel] = useState<Panel>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  const closePanel = useCallback(() => {
    setPanel(null)
    lastFocus.current?.focus()
  }, [])

  function openPanel(next: Exclude<Panel, null>) {
    lastFocus.current = document.activeElement as HTMLElement
    setPanel(next)
  }

  useEffect(() => {
    if (!panel) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closePanel()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [panel, closePanel])

  useEffect(() => {
    document.body.style.overflow = panel ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [panel])

  return (
    <div className="app">
      <Header
        onOpenMenu={() => openPanel('menu')}
        onOpenAccount={() => openPanel('account')}
      />
      <Routes>
  <Route
    path="/"
    element={
      <main className="landing">
        <article className="card">Kickboxing</article>
        <article className="card">Boxing</article>
        <article className="card">Muay Thai</article>
        <article className="card">MMA</article>
        <article className="card">Wrestling</article>
        <article className="card">Judo</article>
        <article className="card">Jiu-Jitsu</article>
        <article className="card">Wrestling</article>
      </main>
    }
  />
  <Route path="/login" element={<SignIn />} />
</Routes>
      {panel ? (
        <button
          type="button"
          className="overlay"
          aria-label="Close"
          onClick={closePanel}
        />
      ) : null}
      <SideNav open={panel === 'menu'} onClose={closePanel} />
      <AccountPanel open={panel === 'account'} onClose={closePanel} user={user} />
    </div>
  )
}

export default App
