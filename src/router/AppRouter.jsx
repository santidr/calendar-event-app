import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'
import { useAuthStore } from '../hooks'

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore()

    useEffect(() => {
        checkAuthToken()
    }, [])

    if (status === 'checking') {
        return <h1>Loading...</h1>
    }

    return (
        <BrowserRouter>
            <Routes>
                { status === 'not-authenticated' && (
                    <>
                        <Route path='/auth/*' element={ <LoginPage /> } />
                        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                    </>
                ) }
                { status === 'authenticated' && (
                    <>
                        <Route path='/' element={ <CalendarPage /> } />
                        <Route path="/*" element={ <Navigate to="/" /> } />
                    </>
                ) }

                
            </Routes>
        </BrowserRouter>
    )
}