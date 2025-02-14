const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required'],
    minLength: [3, 'Title should have at least 3 characters']
  },
  author: {
    type: String,
    trim: true,
    required: [true, 'Author is required'],
    minLength: [3, 'Author should have at least 3 characters']
  },
  url: {
    type: String,
    trim: true,
    required: [true, 'URL is required']
  },
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString(),
    delete retObj._id,
    delete retObj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)