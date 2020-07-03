const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
mongoose.set('useFindAndModify', false)
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user',{username: 1, name: 1, id:1})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = request.token
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' }) 
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        ...body,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if(!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' }) 
    }

    const blog = await Blog.findById(request.params.id)
    if(decodedToken.id.toString() === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).send({error: "the blog does not belong to the user"})
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user
    }
    const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id, blog, {new: true})
        .populate('user',{username: 1, name: 1, id:1})
    response.json(updatedBlog)
})
module.exports = blogsRouter