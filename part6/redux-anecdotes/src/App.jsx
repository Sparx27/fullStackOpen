import { useEffect, useRef } from 'react'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { clearNotification } from './redux/reducers/notificationSlice'
import { getAll } from './services/anecdotes_api'
import { setAnecdotes } from './redux/reducers/anecdotesSlice'

const App = () => {
  const dispatch = useDispatch()
  const timeoutRef = useRef(null)

  useEffect(() => {
    async function chargeNotes() {
      const anecdotes = await getAll()
      dispatch(setAnecdotes(anecdotes))
    }
    chargeNotes()
  }, [])

  function onNotification() {
    if(timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList onNotification={onNotification} />
      <AnecdoteForm onNotification={onNotification} />
    </div>
  )
}

export default App