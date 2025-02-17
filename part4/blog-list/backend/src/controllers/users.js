const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.js')

usersRouter.get('/', async (req, res, next) => {
  try {
    const userList = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
    res.json(userList)
  }
  catch(err) {
    next(err)
  }
})

usersRouter.post('/', async (req, res, next) => {
  const { body } = req
  if(Object.keys(body).length < 1 || !body.username || !body.password || !body.name)
    return res.status(400).json({ message: 'Content missing' })

  if(body.password.length < 3)
    return res.status(400).json({ message: 'Password must contain at least 3 characters' })

  const hashedPassword = await bcrypt.hash(body.password, 10)
  const newUser = new User({ ...body, password: hashedPassword })

  try {
    await newUser.save()
    res.status(201).json({ message: 'User registered' })
  }
  catch(err) {
    next(err)
  }
})

module.exports = usersRouter