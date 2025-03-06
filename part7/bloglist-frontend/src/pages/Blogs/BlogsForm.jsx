import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../hooks/useInput'
import { addNewBlog } from '../../store/slices/blogsSlice'
import { resetUseInputs } from '../../utils'

const BlogsForm = ({ togglableRef }) => {
  const user = useSelector(state => state.user)
  const title = useInput('text', 'title')
  const author = useInput('text', 'author')
  const url = useInput('text', 'url')
  const dispatch = useDispatch()

  async function onAdd(e) {
    e.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    await Promise.resolve(dispatch(addNewBlog(newBlog, user)))
    resetUseInputs(title, author, url)
    togglableRef.current.toggleVisibility()
  }

  return (
    <div>

      <div className='col-12'>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <button
              className='btn btn-outline-info border-bottom-0'
              onClick={() => togglableRef.current.toggleVisibility()}>
            close
            </button>
          </div>
        </div>
      </div>


      <div className='col-12 col-md-6'>
        <form onSubmit={e => onAdd(e)}>
          <div className='rounded border border-info p-4'>
            <h2 className='text-info mb-4 text-center'>Add blog</h2>
            <input
              className='form-control mb-3'
              style={{ display: 'block', marginBottom: '15px' }}
              {...title.attributes}
              required
            />
            <input
              className='form-control mb-3'
              style={{ display: 'block', marginBottom: '15px' }}
              {...author.attributes}
              required />
            <input
              className='form-control mb-3'
              style={{ display: 'block', marginBottom: '15px' }}
              {...url.attributes}
              required />

            <input className='btn btn-info w-100 text-white fw-bold' type="submit" value="Add" />
          </div>
        </form>
      </div>

    </div>
  )
}

export default BlogsForm