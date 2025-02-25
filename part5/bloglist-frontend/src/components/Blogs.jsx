import { useRef, useState } from 'react'
import Blog from './Blog'
import BlogsForm from './BlogsForm'
import AlertMessage from './AlertMessage'
import Togglable from './Togglable'

const Blogs = ({ blogs, user, setUser, blogsActions, }) => {
  const { addBlog, updateBlogs, deleteBlog } = blogsActions
  const timeoutRef = useRef(null)
  const toggableRef = useRef(null)
  const [message, setMessage] = useState(null)

  function onLogout() {
    localStorage.clear()
    setUser(null)
  }

  function addMessage(msg) {
    setMessage(msg)

    if(timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setMessage(null)
      timeoutRef.current = null
    }, 5000)
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1>Blogs</h1>
        {
          message && <AlertMessage
            message={message.message}
            type={message.type ? message.type : null} />
        }
        <p style={{ display: 'inline', marginInlineEnd: '7px' }}>{user.name} logged in</p>
        <button onClick={onLogout}>Logout</button>
      </div>

      <Togglable ref={toggableRef} btnLabel='Add new blog'>
        <BlogsForm
          addBlog={addBlog}
          user={user}
          addMessage={addMessage}
          toggableRef={toggableRef} />
      </Togglable>

      <div style={{ marginTop: '20px' }}>
        {
          blogs.map(blog => <Blog
            key={blog.id.toString()}
            user={user}
            blog={blog}
            addMessage={addMessage}
            updateBlogs={updateBlogs}
            deleteBlog={deleteBlog} />)
        }
      </div>
    </div>
  )
}

export default Blogs