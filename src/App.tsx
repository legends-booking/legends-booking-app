import { useCallback, useEffect, useRef, useState } from 'react'
import { Header } from './components/Header'
import { SideNav } from './components/SideNav'
import { useAuth } from './useAuth'
import { SignIn } from './pages/SignIn'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { NewUserSignUp } from './pages/NewUserSignUp'
import { MembershipPlans } from './pages/MembershipPlans'
import { ProtectedRoute } from './ProtectedRoutes'



function App() {

  type Panel = 'menu' | 'account' | null

  const navigate = useNavigate()
  
  const [panel, setPanel] = useState<Panel>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const { user } = useAuth()
  const UPCOMING = [
    {
      date: 'Thu 4 Sep',
      classes: [
        { name: 'Kickboxing', time: '18:00' },
        { name: 'Boxing', time: '19:30' },
      ],
    },
    {
      date: 'Sat 6 Sep',
      classes: [{ name: 'MMA', time: '10:00' }],
    },
  ]
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
      />
      <Routes>
  <Route
    path="/"
    element={
      <main className={user? " landing landing-schedule":"landing"}>
        {user?(
          <>
          <h1 className="schedule-heading">Upcoming Classes</h1>
          {
            UPCOMING.map((activity) =>(
              <section key={activity.date} className="schedule-day">
              <article className="card card-date">{activity.date}</article>
              {activity.classes.map((cls) => (
                <article key={`${activity.date}-${cls.name}`} className="card">
                  <span>{cls.name}</span>
                  <span className="card-time">{cls.time}</span>
                </article>
              ))}
            </section>
          ))
          }
          </>
        ):(
          <>
          <button type="button" className="cta" onClick={() => navigate('/login')}>
            Sign in to book
          </button>
          </>
        )}
      </main>
    }
  />
  <Route path="/login" element={<SignIn/>} />
  <Route element={<ProtectedRoute roles={['admin']} />}>
    <Route path="/signup" element={<NewUserSignUp />} />
  </Route>
  <Route path="/packages" element={<MembershipPlans user={user} />} />
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
