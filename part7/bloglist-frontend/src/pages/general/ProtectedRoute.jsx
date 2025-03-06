import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ logUser }) => {
  return (
    logUser
      ? <Outlet />
      : (
        <div className='container text-center pt-5'>
          <h1>Unauthorized, please <Link className='link-primary' to='/'>log in</Link> first</h1>
        </div>
      )
  )
}



export default ProtectedRoute