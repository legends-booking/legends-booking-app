
import { useAuth } from './context/useAuth'
import { SignIn } from './pages/SignIn'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { NewUserSignUp } from './pages/NewUserSignUp'
import { MembershipPlans } from './pages/MembershipPlans'
import { ProtectedRoute } from './ProtectedRoutes'
import { ScheduleLoading } from './components/ScheduleLoading'
import { InvitePage, ResetPasswordPage } from './pages/ResetPassword'
import { ForgotPassword } from './pages/ForgotPassword'
import { Dock } from './components/Dock'



function App() {
  const navigate = useNavigate()
  const { user , status} = useAuth()
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
  return (
    <div className="app">
      <header className="site-header">
        <p className="brand">Legends</p>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            status === 'loading' ? <ScheduleLoading /> :(
            <main className="landing page">
              {user?(
                <>
                <h1 className="page-heading">Upcoming Classes</h1>
                {
                  UPCOMING.map((activity) =>(
                    <section key={activity.date} className="schedule-day">
                    <article className="card card-date">{activity.date}</article>
                    {activity.classes.map((cls) => (
                      <button type="button" key={`${activity.date}-${cls.name}`}
                        className="card card-class" onClick={() => {}}>
                        <span>{cls.name}</span>
                        <span className="card-time">{cls.time}</span>
                      </button>
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
            </main>)
            
          }
        />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />
        <Route path="/invite" element={<InvitePage/>} />
        <Route path="/packages" element={<MembershipPlans user={user} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route path="/signup" element={<NewUserSignUp />} />
        </Route>
        
      </Routes>
      <Dock unreadCount={1} user={user} />
    </div>
  )
}

export default App
