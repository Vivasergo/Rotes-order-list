import './App.css'
import Login from './Components/Login/Login'
import Orders from './Components/Orders/Orders'
import { useEffect, useState } from 'react'
import { Logout } from './Components/Logout/Logout'
import { Loading } from './Components/Loading/Loading'

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [error, setError] = useState({ isError: false, errorMessage: '' })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (sessionStorage['accessToken']) {
            setIsAuth(true)
        }
    }, [])

    useEffect(() => {
        if (error.isError) {
            sessionStorage.clear()
            setIsAuth(false)
        }
    }, [error.isError])

    return (
        <div className='App'>
            <div className='App-bg'></div>
            {isLoading && <Loading />}
            <h1>Welcome to the order route app!</h1>

            {isAuth && (
                <>
                    <Logout setIsAuth={setIsAuth} />
                    <Orders setError={setError} setIsLoading={setIsLoading} isAuth ={isAuth}/>
                </>
            )}
            {!isAuth && <Login setIsAuth={setIsAuth} setError={setError} setIsLoading={setIsLoading} />}
            {error.isError && <div className='error-message'>{error.errorMessage}</div>}
        </div>
    )
}

export default App
