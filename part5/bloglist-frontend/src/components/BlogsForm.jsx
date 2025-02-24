import React, { useState } from 'react'
import { postBlog } from '../services/blogs'

const BlogsForm = ({ user, blogs, setBlogs, addMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  async function onAdd(e) {
    e.preventDefault()
    addMessage({ message: '', type: '' })
    const newBlog = { title, author, url }
    try {
      const newData = await postBlog(newBlog, user)
      setBlogs([...blogs, newData])
      setTitle('')
      setAuthor('')
      setUrl('')
      addMessage({
        message: `New blog "${newData.title}" by ${newData.author} added`,
        type: 'success'
      })
    }
    catch(err) {
      addMessage({
        message: err?.message || 'Unexpected error',
        type: 'error'
      })
    }
  }

  return (
    <div style={{marginTop: "10px"}}>
      <form onSubmit={e => onAdd(e)} style={{border: "1px solid grey", width: "fit-content", padding: "8px"}}>
        <h2 style={{marginTop: '8px'}}>Add blog</h2>
        <input 
          style={{display: 'block', marginBottom: '15px'}}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          required />
        <input
          style={{display: 'block', marginBottom: '15px'}} 
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder='Author'
          required />
        <input
          style={{display: 'block', marginBottom: '15px'}} 
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

export default BlogsForm