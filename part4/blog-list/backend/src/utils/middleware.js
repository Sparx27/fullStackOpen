const { User } = require("../../tests/utils/user_helper")
const { SECRET } = require("./config")
const jwt = require('jsonwebtoken')

const unknownPath = (req, res) => res.status(404).json({ message: 'Unknown path' })

const errorsHandler = (err, req, res, next) => {
  if(err.name === 'CastError') {
    return res.status(400).json({ message: 'Malformatted ID' })
  }
  if(err.name === 'ValidationError') {
    return res.status(400).json({
      message: err.message?.substring(err.message.lastIndexOf(':') + 2) || 'Error in validations'
    })
  }
  if(err.name === 'MongoServerError') {
    if(err.message.includes('E11000 duplicate key error')) {
      if(err.message.includes('username')) return res.status(409).json({ message: 'Username already taken' })
    }
  }

  console.log('ERROR NAME ', err?.name)
  console.log('ERROR MESSAGE ', err?.message)
  console.log('ERROR CODE ', err?.message)
  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')) req.token = authorization.replace('Bearer ', '')
  next()
}

const userExtractor = async (req, res, next) => {
  let decodedToken
  let user

  try {
    decodedToken = jwt.verify(req.token ?? '', SECRET)
  }
  catch {
    return res.status(401).json({ message: 'Incorrect token' })
  }

  try {
    user = await User.findById(decodedToken.id)
    if(!user) return res.status(401).json({ message: 'Wrong user' })
  }
  catch(err) {
    console.log('ERROR AT decodeToken - user', err)
    res.status(500).json({ message: 'Something went wrong' })
  }

  req.loggedUser = user
  next()
}

module.exports = {
  unknownPath,
  errorsHandler,
  tokenExtractor,
  userExtractor
}