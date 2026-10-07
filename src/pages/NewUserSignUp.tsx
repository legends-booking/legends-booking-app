import { useEffect, useState, type FormEvent } from 'react'
import type { User } from '../types'
import {createUser} from '../api/usersignup'
import type { Membership } from '../types'
import { getMemberships } from '../api/membershipPlans'

export function NewUserSignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [plan, setPlan] = useState('')
    const [createdUser, setCreatedUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [memberships, setMemberships] = useState<Membership[]>([])

    useEffect(() => {
        getMemberships().then((memberships) => {
            setMemberships(memberships)
        })
    }, [])

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const user: User = {
            id: '',
            role: 'customer',
            name,
            email,
            mobile,
            plan
        }
        createUser(user).then((response) => {
           setCreatedUser(response.user)
           response.user.name.split(' ')[0]
        }).catch((error) => {
            console.error(error)
            setError('Failed to create user')
        })
    }

    function resetForm(){
        setName('')
        setEmail('')
        setMobile('')
        setPlan('')
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
                <dd>{membership.name}</dd>
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
                        <label htmlFor="plan">Plan</label>
                        <select id="plan" required value={plan} onChange={(e) => setPlan(e.target.value)}>
                        <option value="">Select a plan</option>
                        {memberships.map((membership) => (
                            <option key={membership.id} value={membership.id}>{membership.name}</option>
                        ))}
                        </select>
                    </div>
                    <button type="submit" className="cta">Sign Up</button>
                </form>
            </main>
        )
}

