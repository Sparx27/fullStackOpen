import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='container pt-5'>
      <p className='fs-3 mt-4 text-center'>404: Page not found</p>
      <Link to='/' className='d-block fs-4 link link-primary text-decoration-none text-center'>Home</Link>
    </section>
  )
}

export default NotFound