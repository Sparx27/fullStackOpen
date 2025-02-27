import { useDispatch, useSelector } from 'react-redux'
import Anecdote from './Anecdote'
import { voteAnecdote } from '../redux/reducers/anecdotesSlice'
import { setNotification } from '../redux/reducers/notificationSlice'
import { fetchVoteAnecdote } from '../services/anecdotes_api'

const AnecdoteList = ({ onNotification }) => {
  const anecdotes = useSelector(state => {
    const filteredAnecdotes = state.anecdotes.filter(a => a.content.includes(state.filter))
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  async function fVote(anecdote) {
    const { content } = anecdote
    try {
      const res = await fetchVoteAnecdote(anecdote)
      dispatch(voteAnecdote(res))
      dispatch(setNotification(`You voted '${content}'`))
      onNotification()
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