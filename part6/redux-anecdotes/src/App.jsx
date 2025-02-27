import { useRef } from 'react'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { clearNotification } from './redux/reducers/notificationSlice'

const App = () => {
  const dispatch = useDispatch()
  const timeoutRef = useRef(null)

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