import { useEffect, useState,useRef, type FormEvent } from 'react'
import type { User } from '../types'
import {createUser} from '../api/usersignup'
import type { Membership } from '../types'
import { getMemberships } from '../api/membershipPlans'




export function NewUserSignUp() {
    const ROLES = [
        ['customer', 'Customer'],
        ['admin', 'Admin'],
        ['instructor', 'Instructor']] as const
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [plan, setPlan] = useState('')
    const [role, setRole] = useState<User['role']>('customer')
    const [createdUser, setCreatedUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [memberships, setMemberships] = useState<Membership[]>([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [planOpen, setPlanOpen] = useState(false)
    const planPickerRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        
            getMemberships().then((memberships) => {
                setMemberships(memberships)
            })

    }, [])

    useEffect(() => {
        if (!planOpen) return
            function onPointerDown(event: PointerEvent) {
                if (!planPickerRef.current?.contains(event.target as Node)) {
                    setPlanOpen(false)
                }
        }
        document.addEventListener('pointerdown', onPointerDown)
        return () => document.removeEventListener('pointerdown', onPointerDown)
    },[planOpen])

    const  handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const payload ={
            name,
            email,
            mobile,
            role,
            plan,
            startDate,
            endDate
        }
        try {
        const { user } = await createUser(payload);
        setCreatedUser(user)
        } catch (err) {
        setError((err as Error).message); // e.g. the backend's `error` text for a 400
        }
    }

    function resetForm(){
        setName('')
        setEmail('')
        setMobile('')
        setPlan('')
        setStartDate('')
        setEndDate('')
        setCreatedUser(null)
        setError(null)
    }
    if (createdUser) {
        const firstName = createdUser.name.split(' ')[0]
        const membership = memberships.find(
            membership => membership.id ===createdUser.plan)
        return (
            <main className="landing landing-confirm">
            <section className="member-card">
              <h1>{firstName} is signed up</h1>
              <dl className="member-details">
                <div>
                  <dt>Name</dt>
                  <dd>{createdUser.name}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{createdUser.email}</dd>
                </div>
                <div>
                  <dt>Mobile</dt>
                  <dd>{createdUser.mobile}</dd>
                </div>
                <div>
                <dt>Package</dt>
                <dd>{membership?.name}</dd>
                </div>
              </dl>
              <button type="button" className="cta" onClick={resetForm}>
                Add another user
              </button>
            </section>
          </main>
        )
      }
        return(
            <main className="landing">
                
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h1>Add New User</h1>
                    {error ?<p className="form-error" role="alert">{error} </p>:null}
                    <div>
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="mobile">Mobile</label>
                        <input type="tel" id="mobile" required value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>
                    <div>
                        <span id="role-label">Role</span>
                        <div className="choice-row" role="radiogroup" aria-labelledby="role-label">
                            {ROLES.map(([value, label]) => (
                            <label key={value} className="choice">
                                <input
                                type="radio"
                                name="role"
                                value={value}
                                checked={role === value}
                                onChange={() => setRole(value)}
                                required
                                />
                                {label}
                            </label>
                            ))}
                        </div>
                    </div>
                    <div className="plan-picker" ref={planPickerRef}>
                        <button
                            type="button"
                            className="plan-picker-button"
                            aria-expanded={planOpen}
                            onClick={() => setPlanOpen((open) => !open)}
                        >
                            {memberships.find((membership) => membership.id === plan)?.name ?? 'Select a plan'}
                        </button>
                        {planOpen ? (
                            <ul className="plan-picker-menu" role="listbox">
                            {memberships.map((membership) => (
                                <li key={membership.id}>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={plan === membership.id}
                                    onClick={() => {
                                    setPlan(membership.id)
                                    setPlanOpen(false)
                                    }}
                                >
                                    {membership.name}
                                </button>
                                </li>
                            ))}
                            </ul>
                        ) : null}
                    </div>
                    <div className="auth-form-row">
                        <div>
                            <label htmlFor="startDate">MembershipStart Date</label>
                            <input type="date" id="startDate" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="endDate">Membership End Date</label>
                            <input type="date" id="endDate" required value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>
                    <button type="submit" className="cta">Sign Up</button>
                </form>
            </main>
        )
}

