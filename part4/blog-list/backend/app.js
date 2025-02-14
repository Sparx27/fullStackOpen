const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGO_URI } = require('./src/utils/config.js')
const { logInfo, logError, logRequest } = require('./src/utils/logger.js')
const { unknownPath, errorsHandler } = require('./src/utils/middleware.js')
const { blogsRouter } = require('./src/controllers/blogs.js')

mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URI)
  .then(() => logInfo('Mongodb connected'))
  .catch(err => logError('Mongodb connection failed: ', err))

const app = express()
app.use(cors())
app.use(express.json())
app.use(logRequest())

app.use('/api/blogs', blogsRouter)

app.use(unknownPath)
app.use(errorsHandler)

module.exports = app