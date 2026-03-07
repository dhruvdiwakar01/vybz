
import React, { useState } from 'react'
import "../style/register.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {

    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const navigate = useNavigate()

    const { loading, handleRegister } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        await handleRegister({ username, password, email })

        navigate('/')

    }

    return (
        <main className="register-page">
            <div className="login-panel">
                <div className="login-panel__glow" />
                <div className="login-panel__content">
                    <div className="login-panel__logo">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="18,4 32,28 4,28" stroke="#6EE86E" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
                            <line x1="18" y1="14" x2="18" y2="24" stroke="#6EE86E" strokeWidth="2.2" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <span className="login-panel__tagline">Welcome to the VYBZ <br />create account the vibe together.</span>
                </div>
            </div>

            <div className="form-container">
                <div className="form-container__inner">
                    <h1>Register</h1>
                    <p className="form-container__subtitle">Create your account to get started.</p>

                    <form onSubmit={handleSubmit}>
                        <FormGroup
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            label="Name" placeholder="Enter your name" />
                        <FormGroup
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email" placeholder="Enter your email" />
                        <FormGroup
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password" placeholder="Enter your password" />
                        <button className='button' type="submit" disabled={loading}>
                            {loading ? <span className="button__spinner" /> : "Register"}
                        </button>
                    </form>

                    <p className="form-container__footer">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Register
