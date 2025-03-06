import React from 'react'
import LoginForm from './LoginForm'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
  const user = useSelector(state => state.user)

  return (
    <section className='container pt-5'>
      {
        user
          ? <div>
            <p className='fs-3'>Find out our <Link to='/blogs'>blogs</Link></p>
          </div>
          : <LoginForm />
      }
    </section>
  )
}

export default Home