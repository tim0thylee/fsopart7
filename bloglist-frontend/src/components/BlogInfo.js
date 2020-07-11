/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import blogsService from '../services/blogs'

const BlogInfo = ({ updateBlog, username, handleDelete }) => {
    const blogs = useSelector(state => state.blogs)
    const id = useParams().id
    const [content, setContent] = useState('')
    const [comments, setComments] = useState([])
    const blog = blogs.find(blog => blog.id === id)

    useEffect(() => {
        if (blog) {setComments(blog.comments)}
    }, [blog])

    const handleDeleteButton = event => {
        handleDelete(blog.id, blog)
    }

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

    const addComment = async () => {
        const comment = {
            content
        }
        const comments = await blogsService.createComment(blog.id, comment)
        setComments(comments)
        setContent('')
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
            <div>added by {blog.user.username}</div>
            {username === blog.user.username ? <button onClick={handleDeleteButton} className="removeButton">remove</button> : null}
            <br/>
            <h3>comments</h3>
            <input onChange={e => setContent(e.target.value)} value={content}/>
            <button onClick={addComment}>add comment</button>
            <br/>
            <ul>
                {comments.map((comment, i) => <li key={i}>{comment}</li>)}
            </ul>
        </div>
    )
}

export default BlogInfo