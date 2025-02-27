import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../redux/reducers/notificationSlice'
import { createNewAnecdote } from '../redux/reducers/anecdotesSlice'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const contentRef = useRef(null)

  async function onAdd(e) {
    e.preventDefault()

    try {
      dispatch(createNewAnecdote(contentRef.current.value))
      e.target.reset()
      dispatch(showNotification('Anecdote created', 10))
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