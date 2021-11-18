import React from 'react'

export const Logout = ({setIsAuth}) => {

    const handleLogout = (e) => {
        e.preventDefault()
        sessionStorage.clear()
        setIsAuth(false)
    }

    return <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
}