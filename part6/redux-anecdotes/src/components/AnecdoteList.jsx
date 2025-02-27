import { useDispatch, useSelector } from 'react-redux'
import Anecdote from './Anecdote'
import { voteAnecdote } from '../redux/reducers/anecdotesSlice'
import { setNotification } from '../redux/reducers/notificationSlice'

const AnecdoteList = ({ onNotification }) => {
  const anecdotes = useSelector(state => {
    const filteredAnecdotes = state.anecdotes.filter(a => a.content.includes(state.filter))
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  function fVote(anecdote) {
    const { id, content } = anecdote
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted '${content}'`))
    onNotification()
  }

  return (
    <>
      {
        anecdotes.map(a => <Anecdote key={a.id} anecdote={a} fVote={fVote} />)
      }
    </>
  )
}

export default AnecdoteList