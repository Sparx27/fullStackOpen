const blogsRouter = require('express').Router()
const { User } = require('../../tests/utils/user_helper.js')
const Blog = require('../models/blog.js')
const { userExtractor } = require('../utils/middleware.js')

blogsRouter.delete('/reset', async (req, res, next) => {
  try {
    await User.deleteMany({})
    await Blog.deleteMany({})
    res.end()
  }
  catch(err) {
    next(err)
  }
})

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

blogsRouter.post('/', userExtractor, async (req, res, next) => {
  if(!req.body || Object.keys(req.body).length === 0) return res.status(404).json({ message: 'Content missing' })

  const { loggedUser } = req
  try {
    const newBlog = new Blog({ ...req.body, user: loggedUser._id })
    const result = await newBlog.save()

    loggedUser.blogs = [...loggedUser.blogs, result._id]
    await loggedUser.save()

    res.status(201).json(result)
  }
  catch(err) {
    next(err)
  }
})

blogsRouter.delete('/:id', userExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if(!blog) return res.status(404).json({ message: 'Blog not found' })

    if(blog.user.toString() !== req.loggedUser.id) return res.status(401).json({ message: 'This blog can only be deleted by its owner' })

    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }
  catch(err) {
    next(err)
  }
})

blogsRouter.put('/:id', userExtractor, async (req, res, next) => {
  const { title, author, url, likes } = req.body
  if(!title || !author || !url) return res.status(400).json({ message: 'Content missing' })

  try {
    const blog = await Blog.findById(req.params.id)
    if(!blog) return res.status(404).json({ message: 'Blog no found' })
    if(blog.user.toString() !== req.loggedUser.id) {
      return res.status(401).json({ message: 'This blog can only be edited by its owner' })
    }

    const toUpdateBlog = { title, author, url, likes }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, toUpdateBlog, {
      new: true,
      runValidators: true
    })
    res.json(updatedBlog)
  }
  catch(err) {
    next(err)
  }
})

module.exports = {
  blogsRouter
}