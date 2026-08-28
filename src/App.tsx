import { useCallback, useEffect, useRef, useState } from 'react'
import { Header } from './components/Header'
import { SideNav } from './components/SideNav'
import type { User } from './types'
import { SignIn } from './pages/SignIn'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { NewUserSignUp } from './pages/NewUserSignUp'




function App() {

  type Panel = 'menu' | 'account' | null

  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
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

  function onSignIn(currentUser: User) {
    setUser(currentUser)
    navigate('/')
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
  <Route path="/login" element={<SignIn onSignIn={onSignIn} />} />
  <Route path="/signup" element={<NewUserSignUp />} />
</Routes>
      {panel ? (
        <button
          type="button"
          className="overlay"
          aria-label="Close"
          onClick={closePanel}
        />
      ) : null}
      <SideNav open={panel === 'menu'} onClose={closePanel} user={user} />
    </div>
  )
}

export default App
