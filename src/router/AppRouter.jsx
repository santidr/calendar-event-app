import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'

export const AppRouter = () => {

    const authStatus = 'authenticaded'

    return (
        <BrowserRouter>
            <Routes>
                {
                    (authStatus === 'non-authenticaded')
                        ? <Route path='/auth/*' element={<LoginPage />} />
                        : <Route path='/*' element={<CalendarPage />} />
                }

                <Route path="/*" element={ <Navigate to="/auth/login" /> } />
            </Routes>
        </BrowserRouter>
    )
}