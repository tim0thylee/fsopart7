/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersDataReducer'

const BlogList = () => {
    const usersData = useSelector(state => state.usersData)
    const id = useParams().id
    const dispatch = useDispatch()
    const user = usersData.find(user => user.id = id)

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    if (!user) return null
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map(blog => <li key={blog.id}> {blog.title} </li>)}
            </ul>
        </div>
    )
}

export default BlogList