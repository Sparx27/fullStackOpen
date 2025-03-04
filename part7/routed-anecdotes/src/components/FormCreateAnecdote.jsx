import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const FormCreateAnecdote = ({ anecdotes, setAnecdotes, setNotification }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

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

  function onReset() {
    content.reset()
    author.reset()
    info.reset()
  }

  function excludeReset({ reset, ...props }) {
    return props
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
          <input name='content' {...excludeReset(content)} />
        </div>
        <div style={formControlStyle}>
          author
          <input name='author' {...excludeReset(author)} />
        </div>
        <div style={formControlStyle}>
          url for more info
          <input name='info' {...excludeReset(info)} />
        </div>
        <button>create</button>
        <button type='button' onClick={onReset}>reset</button>
      </form>
    </div>
  )
}

export default FormCreateAnecdote