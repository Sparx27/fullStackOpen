const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('./utils/list_helper.js')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test('dummy returns 1', () => {
  const blogs = []

  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('Total likes', () => {
  test('When list does not have blogs', () => {
    const result = totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('When list has 1 blog', () => {
    const result = totalLikes([blogs[0]])
    assert.strictEqual(result, 7)
  })

  test('When list has more than 1 blog', () => {
    const result = totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('Favorite blog', () => {
  test('When list has more than 1 blog', () => {
    const result = favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
})

describe('Author with most blogs', () => {
  test('When list has more than 1 blog', () => {
    const result = mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe('Author with most likes', () => {
  test('When list has more than 1 blog', () => {
    const result = mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})