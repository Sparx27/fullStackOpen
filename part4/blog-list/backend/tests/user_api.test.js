const app = require('../app.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const User = require('../src/models/user.js')
const { initialUsers } = require('./utils/user_helper.js')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const usersObjects = initialUsers.map(u => new User(u))
  const promiseArray = usersObjects.map(u => u.save())
  await Promise.all(promiseArray)
})

describe('Testing user registration', () => {
  test('Try post new user withouth username is rejected with status 400 and message', async () => {
    const newUser = {
      password: "pass1234",
      name: "Marco"
    }
    const response = await api.post('/api/users')
      .send(newUser)
      .expect(400)

    assert(response.body.message === 'Content missing')
  })

  test('Try post new user withouth password is rejected with status 400 and message', async () => {
    const newUser = {
      username: "newnewuser",
      name: "Marco"
    }
    const response = await api.post('/api/users')
      .send(newUser)
      .expect(400)

    assert(response.body.message === 'Content missing')
  })

  test('Try post new user with username already taken is rejected with status 409 and message', async () => {
    const newUser = {
      username: "newuser",
      password: "password123",
      name: "Facundo"
    }

    const { body } = await api.post('/api/users')
      .send(newUser)
      .expect(409)

    assert(body.message === 'Username already taken')
  })

  test('Try post new user with password with length < 3 is rejected with status 400 and message', async () => {
    const newUser = {
      username: "trynewuser",
      password: "pa",
      name: "Marco"
    }
    const { body } = await api.post('/api/users')
      .send(newUser)
      .expect(400)

    assert(body.message === 'Password must contain at least 3 characters')
  })

  test('Try post new user with username with length < 3 is rejected with status 400 and message', async () => {
    const newUser = {
      username: "an",
      password: "password123",
      name: "Gabriel"
    }
    const { body } = await api.post('/api/users')
      .send(newUser)
      .expect(400)

    assert(body.message === 'Username must contain at least 3 characters')
  })
})

after(async () => {
  await mongoose.connection.close()
})