import React from 'react'
import { useParams } from 'react-router-dom'
import { useFindInUserList } from '../../hooks/useUserListContext'

const User = () => {
  const userId = useParams().id
  const user = useFindInUserList(userId)

  if(!user) return <p className='text-center mt-4'>User not found</p>

  const { name, blogs } = user

  return (
    <section className='container pt-4'>
      <h2 className='text-info mb-3 mt-2'>{name}</h2>
      <h3 className='h4 mb-3 mt-2'>Added blogs</h3>
      <ul className='fs-5'>
        {
          blogs?.length > 0
            ? blogs.map(b => <li key={b.id} className='my-2'>{b.title}</li>)
            : <p>User has not added any blogs yet</p>
        }
      </ul>
    </section>
  )
}

export default User