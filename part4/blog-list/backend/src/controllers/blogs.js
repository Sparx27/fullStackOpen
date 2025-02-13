const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', (req, res) => Blog.find({}).then(result => res.json(result)))

blogsRouter.get('/:id', (req, res, next) => Blog.findById(req.params.id)
  .then(result => {
    if(!result) return res.status(404).json({ message: 'Not found' })
    res.json(result)
  })
  .catch(err => next(err)))

blogsRouter.post('/', (req, res) => {
  if(!req.body || Object.keys(req.body).length === 0) return res.status(404).json({ message: 'Content missings' })

  const newBlog = new Blog(req.body)
  newBlog.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(400).json({
      message: err.message?.substring(err.message.lastIndexOf(':') + 2) || 'Error saving new Blog'
    }))
})

module.exports = {
  blogsRouter
}