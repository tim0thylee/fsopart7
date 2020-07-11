/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
import React from 'react'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

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
        <h3 style={{ color: 'red' }}>{notification}</h3>
        <form onSubmit={handleLogin}>
            <div>
                <TextField
                    type="text" 
                    name="Username"
                    id="username"
                    value={username}
                    label='username'
                    variant="outlined"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <br/>
            <div>
                <TextField 
                    type="password"
                    name="Password"
                    id="password"
                    value={password}
                    label='password'
                    variant="outlined"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <br/>
            <Button type="submit" id="loginButton" color="primary" variant="contained">login</Button>
        </form>
        </>
    )
}

export default LoginForm