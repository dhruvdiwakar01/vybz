



import React, { useState } from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {

    const { loading, handleLogin } = useAuth()

    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate("/")
    }

    return (
        <main className="login-page">
            <div className="login-panel">
                <div className="login-panel__glow" />
                <div className="login-panel__content">
                    <div className="login-panel__logo">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="18,4 32,28 4,28" stroke="#6EE86E" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
                            <line x1="18" y1="14" x2="18" y2="24" stroke="#6EE86E" strokeWidth="2.2" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <span className="login-panel__tagline">Welcome back to VYBZ, <br />let's vibe together.</span>
                </div>
            </div>

            <div className="form-container">
                <div className="form-container__inner">
                    <h1>Login</h1>
                    <p className="form-container__subtitle">Welcome back. Enter your details to continue.</p>

                    <form onSubmit={handleSubmit}>
                        <FormGroup
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            placeholder="Enter your email"
                        />
                        <FormGroup
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="Enter your password"
                        />
                        <button className='button' type="submit" disabled={loading}>
                            {loading ? <span className="button__spinner" /> : "Login"}
                        </button>
                    </form>

                    <p className="form-container__footer">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Login