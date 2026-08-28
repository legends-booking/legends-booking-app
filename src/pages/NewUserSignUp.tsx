import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export function NewUserSignUp() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [plan, setPlan] = useState('')

    return(
        <main className="landing">
            <form  className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-form-row">
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="mobile">Mobile</label>
                    <input type="tel" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="plan">Plan</label>
                    <select id="plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <button type="button" className="cta">
                    Sign Up
                </button>
            </form>
        </main>
    )

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        console.log(firstName, lastName, email, mobile, plan)
    }
}

