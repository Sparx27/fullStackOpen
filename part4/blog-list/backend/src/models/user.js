const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    minLength: [3, 'Username must contain at least 3 characters']
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, 'Password must contain at least 3 characters']
  },
  name: {
    type: String,
    trim: true
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString(),
    delete retObj._id,
    delete retObj.__v,
    delete retObj.password
  }
})

module.exports = mongoose.model('User', userSchema)