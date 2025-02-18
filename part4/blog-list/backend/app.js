const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGO_URI } = require('./src/utils/config.js')
const { logInfo, logError, logRequest } = require('./src/utils/logger.js')
const { unknownPath, errorsHandler, tokenExtractor } = require('./src/utils/middleware.js')
const { blogsRouter } = require('./src/controllers/blogs.js')
const usersRouter = require('./src/controllers/users.js')
const loginRouter = require('./src/controllers/login.js')

mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URI)
  .then(() => logInfo('Mongodb connected'))
  .catch(err => logError('Mongodb connection failed: ', err))

const app = express()
app.use(cors())
app.use(express.json())
if(process.env.NODE_ENV !== 'test') {
  app.use(logRequest())
}

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', tokenExtractor, blogsRouter)

app.use(unknownPath)
app.use(errorsHandler)

module.exports = app