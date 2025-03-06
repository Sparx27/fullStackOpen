import { login } from '../../services/user'
import { useInput } from '../../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import Notification from '../../components/Notification'
import { createNotification } from '../../store/slices/notificationSlice'
import { logUser } from '../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const notification = useSelector(state => state.notification)
  const username = useInput('text', 'username')
  const userPass = useInput('password', 'password')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    const result = await Promise.resolve(dispatch(logUser(username.value, userPass.value)))
    if(result) navigate('/blogs')
  }

  return (
    <form onSubmit={handleLogin} className='row px-2'>
      <div className='col-12 col-md-6 col-lg-4 rounded border border-info p-4'>
        <div className='py-2'>
          <h2 className='text-info mb-4 text-center'>Login</h2>
          {
            notification &&
            <div className='mb-3'>
              <Notification message={notification.message} type={notification.type} />
            </div>
          }
          <input
            className='form-control mb-3'
            {...username.attributes}
            required />
          <input
            className='form-control mb-3'
            {...userPass.attributes}
            required />

          <input className='btn btn-info w-100 text-white fw-bold' type="submit" value='Login' />
        </div>
      </div>
    </form>
  )
}

export default LoginForm