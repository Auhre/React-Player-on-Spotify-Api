import axios from 'axios'
import { useEffect, useState } from "react"


function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    
    useEffect(() => {
        axios.post('http://localhost:5000/login', { code })
        .then(res => {
            //console.log(res.data)
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, '/')
        })
        .catch(() => {
            //console.log(code)
        })
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) 
            return
        const interval = setInterval(() => {
            axios.post('http://localhost:5000/refresh', { refreshToken })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
            })
            .catch(() => {
                //console.log(code)
            })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken
}

export default useAuth