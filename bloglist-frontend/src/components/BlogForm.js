/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import {
  Switch, Route, Link
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Blog from './Blog'
import Toggable from './Toggable'
import UsersTable from './UsersTable'
import BlogList from './BlogList'
import BlogInfo from './BlogInfo'

const BlogsForm = ({
  handleLogout,
  handleNewBlog,
  handleUpdateBlog,
  handleDelete,
}) => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const navigationStyle = {
    backgroundColor: '#d3d3d3',
    padding: '2px'
  }

  const createNewBlog = event => {
    event.preventDefault()
    handleNewBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const updateBlog = (event, blogObject, blogId) => {
    event.preventDefault()
    handleUpdateBlog(blogObject, blogId)
  }

  return (
    <>
      <div style={navigationStyle}>
        <Link to={'/blogs'} style={{ marginRight: '3px' }}>blogs</Link>
        <Link to={'/users'} style={{ marginRight: '3px' }}>users</Link>
        {user.name} has logged in
        <Button onClick={handleLogout} variant='contained'>logout</Button>
      </div>
      <br/>
      <h2>blog app</h2>
      <h3 >{notification}</h3>
      <Switch>
        <Route path='/blogs/:id'>
          <BlogInfo
            updateBlog={updateBlog}
            username={user.username}
            handleDelete={handleDelete}
          />
        </Route>
        <Route path='/users/:id'>
          <BlogList />
        </Route>
        <Route path='/users'>
          <UsersTable/>
        </Route>
        <Route path='/'>
          <div className="formDiv">
            <Toggable buttonLabel='new blog'>
              <h2>create new</h2>
              <form onSubmit={createNewBlog} >
                <div>
                  <TextField label="title" type="text" value={title} onChange={({ target }) => setTitle(target.value)} id="title"/>
                </div>
                <div>
                  <TextField label="author" type="text" value={author} onChange={({ target }) => setAuthor(target.value)} id="author"/>
                </div>
                <div>
                  <TextField type="text" label="url" value={url} onChange={({ target }) => setUrl(target.value)} id="url"/>
                </div>
                <Button type="submit" id="createButton" variant='contained' color='primary'>create</Button>
              </form>
            </Toggable>
            <br/>
            {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
              />
            )}
          </div>
        </Route>
      </Switch>
    </>
  )
}

export default BlogsForm