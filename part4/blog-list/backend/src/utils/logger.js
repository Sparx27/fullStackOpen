const morgan = require('morgan')

const logInfo = (info) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(info)
  }
}

const logError = (err) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`\x1b[31m${err}\x1b[0m`)
  }
}

morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : ' ')
const logRequest = () => morgan(':method :url :status :response-time :body')

module.exports = {
  logInfo,
  logError,
  logRequest
}