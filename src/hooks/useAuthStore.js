import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../helpers"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store"

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        
        dispatch(onChecking())

        try {

            const { data } = await calendarApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            console.log(data)

            const user = { uid: data.uid, name: data.name }

            dispatch(onLogin(user))
            
        } catch (error) {
            console.log(error)
            dispatch(onLogout('Incorrect credentials'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    const startRegister = async ({ name, email, password }) => {

        dispatch(onChecking())

        try {
            
            const { data } = await calendarApi.post('/auth/new', { name, email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            const user = { uid: data.uid, name: data.name }

            dispatch(onLogin(user))

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '--'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')

        if (!token) return dispatch(onLogout())

        try {
            
            const { data } = await calendarApi.get('/auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            const user = { uid: data.uid, name: data.name }
            dispatch(onLogin(user))

        } catch (error) {
            localStorage.clear()
            dispatch(onLogout())
        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogout())
    }

    return {
        //* Properties
        status, user, errorMessage,

        //* Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}