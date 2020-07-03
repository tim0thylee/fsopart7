const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Bananas',
        author: 'Jared',
        url: 'www.jared.com',
        likes: 5
    },
    {
        title: 'Bword',
        author: 'Jarey',
        url: 'www.jarey.com',
        likes: 69
    },
]

const initialUser = [{
    username: 'Test',
    name:'Test',
    password: '1234',
}]
  
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const firstUser = initialUser[0]

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(firstUser.password, saltRounds)
    firstUser.passwordHash = passwordHash

    let newUser = new User(firstUser)
    await newUser.save()

    const users = await User.find({}).populate('blogs')
    let blogObject = new Blog({...initialBlogs[0], user: users[0].id})
    await blogObject.save()

    blogObject = new Blog({...initialBlogs[1], user: users[0].id})
    await blogObject.save()
})

test('notes returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are 2 blogs in the database', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('the property "id" exists as a property on the data', async () => {
    const response = await api.get('/api/blogs')
    const idExists = response.body[0].id
    expect(idExists).toBeDefined()
})

test('a blog post is properly posted to the database.', async () => {
    const users = await User.find({})
    const newBlog = {
        title:"Fortnite Warriors",
        author: "Tom",
        url: "www.hello.com",
        likes: 81,
        user: users[0].id
    }
    const login = await api
        .post('/api/login')
        .send({
            username: initialUser[0].username,
            password: initialUser[0].password
        })
        .expect(200)
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${login.body.token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(initialBlogs.length + 1)

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
        'Fortnite Warriors'
    )
})

test('without token, expect no new blog post.', async () => {
    const users = await User.find({})
    const newBlog = {
        title:"Fortnite Warriors",
        author: "Tom",
        url: "www.hello.com",
        likes: 81,
        user: users[0].id
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('if a blog post is missing a "likes" value, set it to 0', async () => {
    const users = await User.find({})
    const newBlog = {
        title:"Tators",
        author: "Tom",
        url: "www.hello.com",
        user: users[0].id
    }
    const login = await api
    .post('/api/login')
    .send({
        username: initialUser[0].username,
        password: initialUser[0].password
    })
    .expect(200)
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${login.body.token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        expect(blog.likes).toBeDefined()
    })
})
//Write a test related to creating new blogs via the /api/blogs endpoint, that verifies that if the title and url properties are missing from the request data, 
//the backend responds to the request with the status code 400 Bad Request. Make the required changes to the code so that it passes the test.
test('blog without url or title propertries returns a 400 bad resquest', async () => {
    const users = await User.find({})
    const noTitle = {
        author: "Nbobody",
        url: 'werw',
        likes: 5,
        user: users[0].id
    }
    const noUrl = {
        title: "no site",
        author: "no site man",
        likes: 10,
        user: users[0].id
    }
    const login = await api
    .post('/api/login')
    .send({
        username: initialUser[0].username,
        password: initialUser[0].password
    })
    .expect(200)

    await api
        .post('/api/blogs')
        .send(noTitle)
        .set('Authorization', `bearer ${login.body.token}`)
        .expect(400)
    await api
        .post('/api/blogs')
        .send(noUrl)
        .set('Authorization', `bearer ${login.body.token}`)
        .expect(400)
})

test('deletion of blog', async () => {
    const response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]

    const login = await api
    .post('/api/login')
    .send({
        username: initialUser[0].username,
        password: initialUser[0].password
    })
    .expect(200)

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${login.body.token}`)
        .expect(204)
})

test('update the likes of a blog', async () => {
    const response = await api.get('/api/blogs')
    const blogToUpdate = response.body[0]
    const updatedBlog = {
        ...blogToUpdate,
        likes: 105
    }
    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
})

afterAll(() => {
    mongoose.connection.close()
})