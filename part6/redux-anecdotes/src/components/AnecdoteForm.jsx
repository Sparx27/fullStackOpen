import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addNote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const contentRef = useRef(null)

  function onAdd(e) {
    e.preventDefault()
    dispatch(addNote(contentRef.current.value))
  }

  return (
    <>
      <h2>create new</h2>
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