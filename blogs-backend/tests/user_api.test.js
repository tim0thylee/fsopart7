const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
})


test('invalid users are not added', async () => {
    const invalidPassword = {
        name: 'Emellia',
        password: 'as',
        username: 'em14141'
    }

    const invalidUsername = {
        name: 'emils',
        password: 'asdfsa',
        username: 'ad'
    }

    await api
        .post('/api/users')
        .send(invalidPassword)
        .expect(400)
    await api
        .post('/api/users')
        .send(invalidUsername)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})