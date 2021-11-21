import './App.css'
import Login from './Components/Login/Login'
import Orders from './Components/Orders/Orders'
import {useEffect, useState} from "react";
import {Logout} from "./Components/Logout/Logout";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [error, setError] = useState({isError: false, errorMessage: ''})

    useEffect(() => {
        if (sessionStorage['accessToken']) {
            setIsAuth(true)
        }
    }, [])

    return (
        <div className='App'>
            <h1>Welcome!</h1>
            {isAuth &&
            <>
                <Logout setIsAuth={setIsAuth}/>
                <Orders setError={setError}/>
            </>
            }
            {!isAuth && <Login setIsAuth={setIsAuth} setError={setError}/>}
            {error.isError && <div className='error-message'>{error.errorMessage}</div>}
        </div>
    )
}

export default App
