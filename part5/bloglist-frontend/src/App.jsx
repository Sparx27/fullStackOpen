import { useState, useEffect } from 'react'
import { getAllBlogs } from './services/blogs'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

const App = () => {
  const usuario = localStorage.getItem('user')
  const [user, setUser] = useState(usuario ? JSON.parse(usuario) : null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    getAllBlogs().then(blogs => {
      blogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  function addBlog(newBlog) {
    setBlogs([...blogs, newBlog])
  }

  function updateBlogs(updateBlog) {
    setBlogs(blogs.map(b => b.id === updateBlog.id ? updateBlog : b))
  }

  function deleteBlog(deleteBlog) {
    setBlogs(blogs.filter(b => b.id !== deleteBlog.id))
  }

  const blogsActions = {
    addBlog,
    updateBlogs,
    deleteBlog
  }

  return (
    <div>
      {
        user === null
          ? <LoginForm setUser={setUser} />
          : (
            <>
              <Blogs
                blogs={blogs}
                user={user}
                blogsActions={blogsActions}
                setUser={setUser} />
            </>
          )
      }
    </div>
  )
}

export default App