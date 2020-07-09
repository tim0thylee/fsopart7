/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const BlogInfo = ({ updateBlog, username, handleDelete }) => {
    const blogs = useSelector(state => state.blogs)
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)

    const handleDeleteButton = event => {
        handleDelete(blog.id, blog)
    }
    console.log(blog)
    const handleUpdateLikes = (event) => {
        const updatedBlog = {
          title: blog.title,
          author: blog.author,
          likes: blog.likes + 1,
          url: blog.url,
          user: blog.user.id
        }
        updateBlog(event, updatedBlog, blog.id)
    }

    if (!blog) return null

    return (
        <div>
            <h2>{blog.title} by {blog.author}</h2>
            <a href={`${blog.url}`} target="_blank" rel="noopener noreferrer">{blog.url}</a>
            <div>
            likes {blog.likes}
            <button onClick={handleUpdateLikes} className='likeButton'>like</button>
            </div>
            <div>added by {username}</div>
            {username === blog.user.username ? <button onClick={handleDeleteButton} className="removeButton">remove</button> : null}
        </div>
    )
}

export default BlogInfo