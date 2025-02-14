const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogList = await Blog.find({})
    res.json(blogList)
  }
  catch(err) {
    next(err)
  }
})

blogsRouter.get('/:id', (req, res, next) => Blog.findById(req.params.id)
  .then(result => {
    if(!result) return res.status(404).json({ message: 'Not found' })
    res.json(result)
  })
  .catch(err => next(err)))

blogsRouter.post('/', async (req, res) => {
  if(!req.body || Object.keys(req.body).length === 0) return res.status(404).json({ message: 'Content missings' })

  const newBlog = new Blog(req.body)
  try {
    const result = await newBlog.save()
    res.status(201).json(result)
  }
  catch(err) {
    res.status(400).json({
      message: err.message?.substring(err.message.lastIndexOf(':') + 2) || 'Error saving new Blog'
    })
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