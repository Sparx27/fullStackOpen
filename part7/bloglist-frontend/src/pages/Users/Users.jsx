import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useUserListContext from '../../hooks/useUserListContext'

const Users = () => {
  const [users, setUsers] = useUserListContext()

  useEffect(() => {
    axios.get('http://localhost:3003/api/users')
      .then(res => setUsers(res.data))
  }, [])

  return (
    <section className='container pt-4'>
      <h2 className='mb-3'>Users</h2>
      <table>
        <thead className='fs-4'>
          <tr className='text-info'>
            <th className='fw-normal'>Name</th>
            <th className='fw-normal'>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.length > 0 && users.map(u => {
              return <tr key={u.id}>
                <td className='py-2 pe-3'>
                  <Link to={`/users/${u.id}`} className='link-primary'>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </section>
  )
}

export default Users