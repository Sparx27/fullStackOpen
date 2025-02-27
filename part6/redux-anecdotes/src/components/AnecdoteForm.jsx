import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addnewAnecdote } from '../redux/reducers/anecdotesSlice'
import { setNotification } from '../redux/reducers/notificationSlice'
import { createOne } from '../services/anecdotes_api'

const AnecdoteForm = ({ onNotification }) => {
  const dispatch = useDispatch()

  const contentRef = useRef(null)

  async function onAdd(e) {
    e.preventDefault()

    try {
      const returnedAnecdote = await createOne(contentRef.current.value)
      dispatch(addnewAnecdote(returnedAnecdote))
      e.target.reset()
      dispatch(setNotification('Anecdote created'))
      onNotification()
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={e => onAdd(e)}>
        <div>
          <input ref={contentRef} type='text' />
        </div>
        <input type='submit' value='create' />
      </form>
    </>
  )
}

export default AnecdoteForm