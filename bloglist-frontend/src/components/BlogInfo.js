/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
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
            <Button onClick={handleUpdateLikes} className='likeButton' color="primary" variant="contained">like</Button>
            </div>
            <div>added by {blog.user ? blog.user.username : null}</div>
            {username === blog.user.username ? <Button onClick={handleDeleteButton} className="removeButton" color="secondary" variant="contained">remove</Button> : null}
            <br/>
            <h3>comments</h3>
            <div>
                <TextField variant="outlined" onChange={e => setContent(e.target.value)} value={content}/>
            </div>
            <br/>
            <Button onClick={addComment} variant="contained">add comment</Button>
            <br/>
            <ul>
                {comments.map((comment, i) => <li key={i}>{comment}</li>)}
            </ul>
        </div>
    )
}

export default BlogInfo