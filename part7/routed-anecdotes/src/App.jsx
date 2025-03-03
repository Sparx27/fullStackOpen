import { Navigate, Route, Routes, useMatch } from 'react-router-dom'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import FormCreateAnecdote from './components/FormCreateAnecdote'
import Footer from './layout/Footer'
import Header from './layout/Header'
import { useRef, useState } from 'react'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const App = () => {
  const [message, setMessage] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  const timeoutRef = useRef(null)

  function setNotification(msg) {
    setMessage(msg)

    if(timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const mainStyle = {
    minHeight: '100vh',
    position: 'relative',
    width: '100%',
    paddingBottom: '100px',
    boxSizing: 'border-box'
  }

  return (
    <main style={mainStyle}>
      <Header />
      {message && <Notification message={message} />}
      <div style={{ padding: '5px 15px' }}>
        <section style={{ paddingBottom: '20px' }}>
          <Routes>
            <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
            <Route
              path='/anecdotes/:id'
              element={anecdote ? <Anecdote anecdote={anecdote} /> : <Navigate replace to='/' />} />
            <Route path='/about' element={<About />} />
            <Route path='/create' element={<FormCreateAnecdote
              anecdotes={anecdotes}
              setAnecdotes={setAnecdotes}
              setNotification={setNotification} />} />
          </Routes>
        </section>
      </div>
      <Footer />
    </main>
  )
}

export default App
