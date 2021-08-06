import {useCallback, useEffect, useState} from "react";
import {UserDto} from "../types/UserDto";
import {loginApi, logoutApi, registerApi} from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../types/AuthResponse";
import jwt_decode from "jwt-decode";

export const useAuth = () => {
    const [user, setUser] = useState<UserDto | null>(null)
    const [isAuth, setAuth] = useState(() => !!localStorage.getItem("token"))
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => setError(null), [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decodedToken: { username: string, id: string } = jwt_decode(token)
            const user = {username: decodedToken.username, id: decodedToken.id}
            setUser(user)
        }
    }, [])

    const login = async (username: string, password: string) => {
        setLoading(true)
        loginApi(username, password)
            .then(res => {
                localStorage.setItem('token', res.data.accessToken)
                setAuth(true)
                setUser(res.data.user)
            })
            .catch(err => {
                setError(err.response?.data?.message)
                setTimeout(() => {
                    setError('')
                }, 4000)
            })
            .finally(() => setLoading(false))
    }

    const registration = async (username: string, password: string) => {
        setLoading(true)
        registerApi(username, password)
            .then(res => {
                localStorage.setItem('token', res.data.accessToken)
                setAuth(true)
                setUser(res.data.user)
            })
            .catch(err => {
                if (err.response?.data?.message === "Errors at registration") {
                    return setError(err.response.data.errors[0].msg)
                }
                setError(err.response?.data?.message)
                setTimeout(() => {
                    setError('')
                }, 4000)
            })
            .finally(() => setLoading(false))

    }

    const logout = async () => {
        setLoading(true)
        logoutApi()
            .then(() => {
                localStorage.removeItem('token')
                setAuth(false)
                setUser(null)
            })
            .catch(err => setError(err.response?.data?.message))
            .finally(() => setLoading(false))
    }

    const checkAuth = useCallback(async () => {
        setLoading(true)
        await axios.get<AuthResponse>(
            "http://localhost:5000/api/refresh", {withCredentials: true}
        )
            .then(res => localStorage.setItem('token', res.data.accessToken))
            .catch(err => setError(err.response?.data?.message))
            .finally(() => setLoading(false))
    }, [])

    return {login, logout, registration, isAuth, user, isLoading, error, checkAuth}
}