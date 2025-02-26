import { useDispatch, useSelector } from 'react-redux'
import Anecdote from './Anecdote'
import { voteNote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  function fVote(id) {
    dispatch(voteNote(id))
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