const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.length < 1 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((fav, blog) => fav.likes < blog.likes ? blog : fav)

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((authors, blog) => {
    const { author } = blog
    const hasAuthor = authors.find(a => a.author === author)
    if(!hasAuthor) {
      authors.push({ author, blogs: 1 })
    }
    else {
      hasAuthor.blogs++
    }
    return authors
  }, [])

  return authors.reduce((actual, author) => actual.blogs < author.blogs ? author : actual)
}

const mostLikes = (blogs) => {
  const authors = blogs.reduce((authors, blog) => {
    const { author } = blog
    const hasAuthor = authors.find(a => a.author === author)
    if(!hasAuthor) {
      authors.push({ author, likes: blog.likes })
    }
    else {
      hasAuthor.likes += blog.likes
    }
    return authors
  }, [])

  return authors.reduce((actual, author) => actual.likes < author.likes ? author : actual)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}