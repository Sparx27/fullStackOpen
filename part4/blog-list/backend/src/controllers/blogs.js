const blogsRouter = require('express').Router()
const { User } = require('../../tests/utils/user_helper.js')
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogList = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    res.json(blogList)
  }
  catch(err) {
    next(err)
  }
})

blogsRouter.get('/:id', (req, res, next) => Blog.findById(req.params.id)
  .populate('user',('user', { username: 1, name: 1, id: 1 }))
  .then(result => {
    if(!result) return res.status(404).json({ message: 'Not found' })
    res.json(result)
  })
  .catch(err => next(err)))

blogsRouter.post('/', async (req, res, next) => {
  if(!req.body || Object.keys(req.body).length === 0) return res.status(404).json({ message: 'Content missing' })

  const newBlog = new Blog(req.body)
  const users = await User.find({})
  newBlog.user = users[0]._id
  try {
    const result = await newBlog.save()
    users[0].blogs = [...users[0].blogs, result._id]
    await users[0].save()
    res.status(201).json(result)
  }
  catch(err) {
    next(err)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
      ? res.status(204).end()
      : res.status(404).json({ message: 'Blog not found' })
  }
  catch(err) {
    next(err)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body

    const toUpdateBlog = { title, author, url, likes }

    if(!title || !author || !url) return res.status(400).json({ message: 'Content missing' })

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, toUpdateBlog, {
      new: true,
      runValidators: true
    })
    updatedBlog ? res.json(updatedBlog) : res.status(404).json({ message: 'Blog not found' })
  }
  catch(err) {
    next(err)
  }
})

module.exports = {
  blogsRouter
}