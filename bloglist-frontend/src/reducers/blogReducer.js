/* eslint-disable indent */
/* eslint-disable linebreak-style */
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
        return action.data
    default:
        return state
  }
}

export const initializeBlogs = (blogs) => {
    return {
        type: 'INIT_BLOGS',
        data: blogs
    }
}

export default blogReducer