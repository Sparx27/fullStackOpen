import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <input
        type="text"
        placeholder="Filter anecdotes"
        onChange={(e) => dispatch(setFilter(e.target.value.toLowerCase()))} />
    </div>
  )
}

export default AnecdoteFilter