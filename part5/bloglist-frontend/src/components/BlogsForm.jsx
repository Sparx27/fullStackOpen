import React, { useState } from 'react'
import { postBlog } from '../services/blogs'
import PropTypes from 'prop-types'

const BlogsForm = ({ addBlog, user, addMessage, toggableRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  async function onAdd(e) {
    e.preventDefault()
    addMessage(null)
    const newBlog = { title, author, url }
    try {
      const returnedBlog = await postBlog(newBlog, user)
      addBlog(returnedBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      addMessage({
        message: `New blog "${returnedBlog.title}" by ${returnedBlog.author} added`,
        type: 'success'
      })
      toggableRef.current.toggleVisibility()
    }
    catch(err) {
      addMessage({
        message: err?.message || 'Unexpected error',
        type: 'error'
      })
    }
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <form onSubmit={e => onAdd(e)} style={{ border: '1px solid grey', width: 'fit-content', padding: '8px' }}>
        <h2 style={{ marginTop: '8px' }}>Add blog</h2>
        <input
          style={{ display: 'block', marginBottom: '15px' }}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          required />
        <input
          style={{ display: 'block', marginBottom: '15px' }}
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder='Author'
          required />
        <input
          style={{ display: 'block', marginBottom: '15px' }}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='URL'
          required />

        <input type="submit" value="Add" />
      </form>
    </div>
  )
}

BlogsForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  addMessage: PropTypes.func.isRequired,
  toggableRef: PropTypes.object.isRequired
}

export default BlogsForm