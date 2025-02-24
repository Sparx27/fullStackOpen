import React, { useRef, useState } from 'react'
import Blog from './Blog'
import BlogsForm from './BlogsForm'
import SuccessMessage from './SuccessMessage'
import ErrMessage from './ErrMessage'

const Blogs = ({ blogs, setBlogs, user, setUser }) => {
  const timeoutRef = useRef(null)

  const [message, setMessage] = useState({
    type: '',
    message: ''
  })

  function onLogout() {
    localStorage.clear()
    setUser(null)
  }

  function addMessage(msg) {
    setMessage(msg)

    if(timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setMessage({
        type: '',
        message: ''
      })
      timeoutRef.current = null
    }, 5000)
  }

  return (
    <div>
      <div style={{marginBottom: "20px"}}>
        <h1>Blogs</h1>
        {
          message.message && message.type === 'success'
            ? <SuccessMessage message={message.message} />
            : message.message && message.type === 'error'
              ? <ErrMessage message={message.message} />
              : ''
        }

        <p style={{display: "inline", marginInlineEnd: "7px"}}>{user.name} logged in</p>
        <button onClick={onLogout}>Logout</button>
      </div>

      <BlogsForm blogs={blogs} setBlogs={setBlogs} user={user} addMessage={addMessage} />

      <div style={{marginTop: "20px"}}>
        {
          blogs.map(blog => <Blog key={blog.id.toString()} blog={blog} />)
        }
      </div>
    </div>
  )
}

export default Blogs