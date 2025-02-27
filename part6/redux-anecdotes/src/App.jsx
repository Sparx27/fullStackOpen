import { useEffect } from 'react'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initialiceAnecdotes } from './redux/reducers/anecdotesSlice'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiceAnecdotes())
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App