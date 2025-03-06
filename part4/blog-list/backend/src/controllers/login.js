const loginRouter = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config.js')

loginRouter.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body

    if(!username || !password) return res.status(400).json({ message: 'Username and password required' })

    const user = await User.findOne({ username })
    const correctPass = user === null
      ? false
      : await bcrypt.compare(password, user.password)
    if(!user || !correctPass) return res.status(401).json({ message: 'Incorrect username or password' })

    const userDataForJwt = {
      username,
      id: user._id
    }

    const token = jwt.sign(userDataForJwt, SECRET)
    res.json({ token, username, name: user.name })
  }
  catch(err) {
    next(err)
  }
})

module.exports = loginRouter