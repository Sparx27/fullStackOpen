require('dotenv').config()

const PORT = process.env.PORT || 3003

const MONGO_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_URI
  : process.env.MONGO_URI

const SECRET = process.env.SECRET

module.exports = {
  PORT,
  MONGO_URI,
  SECRET
}