import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearLogUser } from '../store/slices/userSlice'

const Header = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function onLogout() {
    dispatch(clearLogUser())
    navigate('/')
  }

  return (
    <header className='border-bottom border-primary'>
      {
        !user
          ? <div className='container py-3'>
            <h1 className='text-primary'>Welcome to Blog List App!</h1>
          </div>
          : <div className='container d-flex justify-content-between align-items-center py-3'>
            <h1 className='text-primary'>Blogs App</h1>

            <nav className='fs-4'>
              <Link
                className='link-primary me-3 text-decoration-none'
                to='/blogs'>
                    Blogs
              </Link>
              <Link
                className='link-primary me-3 text-decoration-none'
                to='/users'>
                    Users
              </Link>
            </nav>

            <div>
              <p className='d-inline me-2'>{user.name} logged in</p>
              <button className='btn btn-primary' onClick={onLogout}>Logout</button>
            </div>
          </div>
      }
    </header>
  )
}

export default Header