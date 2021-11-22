import React, {useState} from 'react'
import {api} from "../../Service/api";

const Login = ({setIsAuth, setError, setIsLoading}) => {
    const [formData, setFormData] = useState({username: '', password: ''})

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const response = await api.login(formData)
        setIsLoading(false)
        if (response.status.toString()[0] === '4') {
            setError((prevError) => ({...prevError, isError:true, errorMessage:response.data.detail}))
        }else if(response.status === 200){
            setError((prevError) => ({...prevError, isError:false, errorMessage:''}))
            sessionStorage['accessToken'] = response.data.access_token
            setIsAuth(true)
        }

    }

    return <div>
        <h2>Please Login</h2>
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label> Login:
                    <div>
                        <input onChange={(e) => handleChange(e)} name={'username'} type="text"/>
                    </div>

                </label>
                <label> Password:
                    <div>
                        <input onChange={(e) => handleChange(e)} name={'password'} type="password"/>
                    </div>
                </label>
                <button type="submit">Log in</button>
            </form>
        </div>

    </div>
}

export default Login
