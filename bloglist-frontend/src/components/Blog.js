/* eslint-disable linebreak-style */
import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, username, handleDelete }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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

  // eslint-disable-next-line no-unused-vars
  const handleDeleteButton = event => {
    handleDelete(blog.id, blog)
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setShowDetail(!showDetail)}>view</button>
      {showDetail ?
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleUpdateLikes} className='likeButton'>like</button>
          </div>
          <div>{blog.user.name}</div>
          {username === blog.user.username ? <button onClick={handleDeleteButton} className="removeButton">remove</button> : null}
        </> : null
      }
    </div>
  )}

export default Blog
