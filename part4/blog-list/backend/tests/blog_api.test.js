const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const { Blog, initialBlogs, blogsInDb } = require('./utils/blog_helper.js')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('With previous blogs in the database', () => {

  test('there are 6 blogs', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('blogs have id property', async () => {
    const { body } = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    body.forEach(b => assert.ok(b.id))
  })

  describe('Validating POSTs', () => {
    test('Valid blog can be added ', async () => {
      const newBlog = {
        title: 'Angular patterns',
        author: "Michael Chan",
        url: "https://something",
        likes: 7,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const { body } = await api.get('/api/blogs')

      const titles = body.map(b => b.title)

      assert.strictEqual(body.length, initialBlogs.length + 1)

      assert(titles.includes('Angular patterns'))
    })

    test('If a new blog does not have likes, by default it is 0', async () => {
      const newBlog = {
        title: 'Angular patterns',
        author: "Michael Chan",
        url: "https://something",
      }

      const savedNewBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const { body } = await api.get('/api/blogs')
      assert.strictEqual(body.length, initialBlogs.length + 1)

      assert(savedNewBlog.body.likes === 0)
    })

    test('It is not possible saving a new blog that does not have title or url', async () => {
      const newBlog1 = {
        author: "Michael Chan",
        url: "https://something",
        likes: 10000
      }

      await api
        .post('/api/blogs')
        .send(newBlog1)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const newBlog2 = {
          title: "Something",
          author: "Michael Chan",
          likes: 10000
        }

        await api
          .post('/api/blogs')
          .send(newBlog2)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    })
  })

  test('Deletion of blog succeeds with status code 204 if id is valid', async () => {
    await api
      .delete(`/api/blogs/${initialBlogs[0]._id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)

    const ids = blogsAtEnd.map(b => b.id)
    assert(!ids.includes(initialBlogs[0]._id))
  })

  test('Update of blog succeeds with status code 200 if id is valid', async () => {
    const toUpdateBlog = {
      title: 'Angular patterns',
      author: "Michael Chan",
      url: "https://something",
      likes: 1234567
    }

    await api
      .put(`/api/blogs/${initialBlogs[0]._id}`)
      .send(toUpdateBlog)
      .expect(200)

    const blogsAtEnd = await blogsInDb()

    const likesList = blogsAtEnd.map(b => b.likes)
    assert(likesList.includes(1234567))
  })
})


after(async () => {
  await mongoose.connection.close();
});