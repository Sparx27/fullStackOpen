import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if(!notification) return null

  const { message, type } = notification

  return (
    <div className={`alert mb-0 py-2 text-center ${type === 'error' ? 'alert-danger' : 'alert-success'}`}>
      <p className='m-0 fs-18'>{message}</p>
    </div>
  )
}

export default Notification