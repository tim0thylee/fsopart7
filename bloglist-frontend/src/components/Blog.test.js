/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('render blog initially with just title and author', () => {
    const blog = {
        title: 'Testing with jest',
        author: 'Tester',
        url: 'www.testing.com',
        likes: 5,
        user: {
            name: 'Tinky',
            id:'12345',
            username: 'TinkyLover1234'
        }
    }

    const component = render(
        <Blog blog={blog} />
    )
    
    expect(component.container).toHaveTextContent(
        'Testing with jest Tester'
    )

    expect(component.container).not.toHaveTextContent(
        'www.testing.com likes'
    )
})

test('url and likes shown when view button is clicked.', () => {
    const blog = {
        title: 'Testing with jest',
        author: 'Tester',
        url: 'www.testing.com',
        likes: 5,
        user: {
            name: 'Tinky',
            id:'12345',
            username: 'TinkyLover1234'
        }
    }
 

    const component = render(
        <Blog blog={blog}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'Testing with jest Testerviewwww.testing.comlikes 5likeTinky'
    )
})

test('if like button is clicked twice, the updateBlog will be called twice', () => {
    const blog = {
        title: 'Testing with jest',
        author: 'Tester',
        url: 'www.testing.com',
        likes: 5,
        user: {
            name: 'Tinky',
            id:'12345',
            username: 'TinkyLover1234'
        }
    }
    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} updateBlog={mockHandler}/>
    )
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

//Make a test for the new blog form. The test should check, 
//that the form calls the event handler it received as 
//props with the right details when a new blog is called.

test('Check form is updated with the right state and calls onSubmit.', () => {
    const user = {
        username: 'tomothy1234'
    }
    const blogs = []
    const createBlog = jest.fn()

    const component = render(
        <BlogForm handleNewBlog={createBlog} user={user} blogs={blogs}/>
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
        target:{ value:'Tom' }
    })
    fireEvent.change(title, {
        target:{ value:'Tom\'s blog' }
    })
    fireEvent.change(url, {
        target:{ value:'www.tom.com' }
    })

    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Tom\'s blog')
    expect(createBlog.mock.calls[0][0].author).toBe('Tom')
    expect(createBlog.mock.calls[0][0].url).toBe('www.tom.com')
})