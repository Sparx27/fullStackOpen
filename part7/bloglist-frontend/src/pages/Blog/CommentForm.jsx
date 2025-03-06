import React, { useRef } from 'react'
import { useInput } from '../../hooks/useInput'
import { useDispatch } from 'react-redux'
import { actionAddComment } from '../../store/slices/blogsSlice'

const CommentForm = ({ blogId }) => {
  const content = useInput('text')
  const dispatch = useDispatch()

  const btnRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    btnRef.current.disabled = true
    await Promise.resolve(dispatch(actionAddComment(blogId, content.value)))
    content.reset()
    btnRef.current.disabled = false
  }

  return (
    <form onSubmit={handleSubmit} className='row'>
      <div className='col-12 col-md-6 col-lg-4 rounded border border-info p-3'>
        <label htmlFor="content" className='form-label text-info'>Add comment</label>
        <input
          id='content'
          className='form-control'
          {...content.attributes}
          required />
        <button ref={btnRef} className='btn btn-info text-white fw-bold mt-3' type='submit'>Send</button>
      </div>
    </form>
  )
}

export default CommentForm