import { useDispatch, useSelector } from 'react-redux'
import Anecdote from './Anecdote'
import { voteAnecdote } from '../redux/reducers/anecdotesSlice'
import { showNotification } from '../redux/reducers/notificationSlice'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const filteredAnecdotes =
      state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  async function fVote(anecdote) {
    try {
      dispatch(voteAnecdote(anecdote))
      dispatch(showNotification(`You voted '${anecdote.content}'`, 10))
    }
    catch(err) {
      console.log(err)
    }
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