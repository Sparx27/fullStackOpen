import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addnewAnecdote } from '../redux/reducers/anecdotesSlice'
import { setNotification } from '../redux/reducers/notificationSlice'

const AnecdoteForm = ({ onNotification }) => {
  const dispatch = useDispatch()

  const contentRef = useRef(null)

  function onAdd(e) {
    e.preventDefault()
    dispatch(addnewAnecdote(contentRef.current.value))
    e.target.reset()
    dispatch(setNotification('Anecdote created'))
    onNotification()
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