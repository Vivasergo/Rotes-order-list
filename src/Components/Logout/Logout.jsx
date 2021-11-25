import { Button } from 'antd'
import React from 'react'

export const Logout = ({ setIsAuth }) => {
    const handleLogout = (e) => {
        e.preventDefault()
        sessionStorage.clear()
        setIsAuth(false)
    }

    return (
        <div>
            <Button type='primary' onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}
