import './App.css'
import Login from './Components/Login/Login'
import Orders from './Components/Orders/Orders'
import {useEffect, useState} from "react";
import {Logout} from "./Components/Logout/Logout";
import {checkAuth} from "./Service/CheckAuth";
import {Loading} from "./Components/Loading/Loading";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [error, setError] = useState({isError: false, errorMessage: ''})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (sessionStorage['accessToken']) {
            setIsAuth(true)
        }
    }, [])

    return (
        <div className='App'>
            {isLoading && <Loading/>}
            <h1>Welcome!</h1>

            {isAuth &&
            <>
                <Logout setIsAuth={setIsAuth}/>
                <Orders setError={setError} setIsLoading={setIsLoading}/>
                <button onClick={()=> checkAuth()}>checkAuth</button>
            </>
            }
            {!isAuth && <Login setIsAuth={setIsAuth} setError={setError} setIsLoading={setIsLoading}/>}
            {error.isError && <div className='error-message'>{error.errorMessage}</div>}
        </div>
    )
}

export default App
