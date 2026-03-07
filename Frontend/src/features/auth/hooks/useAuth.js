import { login, register, getMe, logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleRegister({ username, email, password }) {
        try {
            setLoading(true)
            const data = await register({ username, email, password })
            setUser(data.user)
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin({ username, email, password }) {
        try {
            setLoading(true)
            const data = await login({ username, email, password })
            setUser(data.user)
        } finally {
            setLoading(false)
        }
    }

    async function handleGetMe() {
        try {
            setLoading(true)
            const data = await getMe()
            setUser(data.user)
        } catch (error) {
            if (error.response?.status === 401) {
                setUser(null)
            }
        } finally {
            setLoading(false)
        }
    }

    async function handleLogout() {
        try {
            setLoading(true)
            await logout()
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetMe()
    }, [])

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout,
        handleGetMe
    }
}