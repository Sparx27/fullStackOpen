import { useRef } from 'react'
import BlogsForm from './BlogsForm'
import Togglable from '../../components/Togglable'
import { useSelector } from 'react-redux'
import Notification from '../../components/Notification'
import BlogList from './BlogList'

const Blogs = () => {
  const user = useSelector(state => state.user)

  const togglableRef = useRef(null)

  return (
    <>
      <div className='container'>
        <div className='mt-3 mb-0'>
          <Notification />
        </div>

        <div className='row'>
          <div className='mt-4'>
            <Togglable ref={togglableRef} btnLabel='Add new blog'>
              <BlogsForm togglableRef={togglableRef} />
            </Togglable>
          </div>

          <div style={{ marginTop: '20px' }}>
            <BlogList user={user} />
          </div>

        </div>
      </div>
    </>
  )
}

export default Blogs