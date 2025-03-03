import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FormCreateAnecdote = ({ anecdotes, setAnecdotes, setNotification }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAnecdote = {
      content: e.target.content.value,
      author: e.target.author.value,
      info: e.target.info.value,
      votes: 0,
      id: Math.floor(Math.random() * 100000000) + Math.floor(Math.random() * 1000000)
    }
    setAnecdotes([...anecdotes, newAnecdote])
    setNotification(`A new anecdote "${newAnecdote.content}" created`)
    navigate('/')
  }

  const formControlStyle = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '30% 70%',
    marginBottom: '10px'
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} style={{ width: '500px' }}>
        <div style={formControlStyle}>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div style={formControlStyle}>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div style={formControlStyle}>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default FormCreateAnecdote