import { useState, useEffect } from 'react'
import { getAllBlogs } from './services/blogs'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

const App = () => {
  const usuario = localStorage.getItem('user')
  const [user, setUser] = useState(usuario ? JSON.parse(usuario) : null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    getAllBlogs().then(blogs => setBlogs(blogs))  
  }, [])

  return (
    <div>
      {
        user == null
          ? <LoginForm setUser={setUser} />
          : (
            <>
              <Blogs blogs={blogs} setBlogs={setBlogs} user={user} setUser={setUser} /> 
            </>
          )
      }
    </div>
  )
}

export default App