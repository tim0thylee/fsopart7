/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
import React from 'react'
import { useSelector } from 'react-redux'

const LoginForm = ({
    handleLogin,
    username,
    setUsername,
    password,
    setPassword
}) => {
    const notification = useSelector(state => state.notification)
    return (
        <>
        <h2>log in to application</h2>
        <h3 style={{color: 'red'}}>{notification}</h3>
        <form onSubmit={handleLogin}>
            <div>
            username
            <input 
                type="text" 
                name="Username"
                id="username"
                value={username}
                onChange={({target}) => setUsername(target.value)}
            />
            </div>
            <div>
            password
            <input 
                type="password"
                name="Password"
                id="password"
                value={password}
                onChange={({target}) => setPassword(target.value)}
            />
            </div>
            <button type="submit" id="loginButton">login</button>
        </form>
        </>
    )
}

export default LoginForm