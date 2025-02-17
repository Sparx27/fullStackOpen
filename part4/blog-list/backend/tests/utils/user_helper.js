const User = require('../../src/models/user.js')

const initialUsers = [
  {
    username: "username1",
    password: "password123",
    name: "Geralt"
  },
  {
    username: "newuser",
    password: "11223344",
    name: "Martin"
  },
  {
    username: "megan",
    password: "megan123",
    name: "Megan"
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(blog => blog.toJSON())
}

module.exports = {
  User,
  usersInDb,
  initialUsers
}