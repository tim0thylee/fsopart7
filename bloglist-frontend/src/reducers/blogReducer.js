/* eslint-disable indent */
/* eslint-disable linebreak-style */
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
        return action.data
    case 'CREATE_BLOG':
        return [...state, action.data]
    case 'DELETE_BLOG':
        return state.filter(blog => blog.id !== action.id)
    case 'UPDATE_BLOG':
        return state.map(blog => blog.id !== action.data.id ? blog : action.data.updatedBlogResponse)
    default:
        return state
  }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const setBlogs = blogs => {
    return {
        type: 'INIT_BLOGS',
        data: blogs
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'CREATE_BLOG',
            data: newBlog
        })
    }
}

export const deleteBlog = (blogId) => {
    return async dispatch => {
        await blogService.deleteBlog(blogId)
        dispatch({
            type: 'DELETE_BLOG',
            id: blogId
        })
    }
}

export const updateBlog = (updatedBlog, id) => {
    return async dispatch => {
        const updatedBlogResponse = await blogService.update(updatedBlog, id)
        dispatch({
            type: 'UPDATE_BLOG',
            data: { id, updatedBlogResponse }
        })
    }
}

export default blogReducer