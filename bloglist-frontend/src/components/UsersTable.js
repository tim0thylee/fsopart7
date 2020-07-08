/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersDataReducer'

const UsersTable = () => {
    const dispatch = useDispatch()
    const usersData = useSelector(state => state.usersData)
    const blogs = useSelector(state => state.blogs)

    useEffect(() => {
        dispatch(initializeUsers())
    }, [blogs.length])

    return (
        <div>
        <table style={{ width: '300px' }}>
          <thead>
            <tr>
              <th align='left' ><h2>Users</h2></th>
              <th align='left' ><h2>blogs created</h2></th>
            </tr>
          </thead>
          <tbody>
            {usersData.map(user => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>
                      {user.username}
                    </Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
}

export default UsersTable