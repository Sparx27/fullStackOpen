import { likeBlog, removeBlog } from '../services/blogs'
import Togglable from './Togglable'

const Blog = ({ user, blog, addMessage, updateBlogs, deleteBlog }) => {
  const { id, title, author, url, likes } = blog

  async function onLike() {
    try {
      const updateBlog = {
        id,
        title,
        author,
        url,
        likes: likes + 1
      }
      const updatedBlog = await likeBlog(updateBlog, user)
      updateBlogs(updatedBlog)
    }
    catch(err) {
      addMessage({
        message: err.message,
        type: 'error'
      })
    }
  }

  async function onRemove() {
    if(window.confirm('Are you sure to delete this blog?')) {
      try {
        await removeBlog(blog, user)
        deleteBlog(blog)
        addMessage({
          message: 'Blog deleted',
        })
      }
      catch(err) {
        addMessage({
          message: err.message,
          type: 'error'
        })
      }
    }
  }

  return (
    <div style={{ borderBottom: '1px solid grey', marginBottom: '15px', paddingBottom: '10px' }}>
      <p 
        style={{ margin: '0', display: 'inline', marginInlineEnd: '8px' }}
        data-testid='blog-title-author'>
        {title}, <em>by {author}</em>
      </p>
      <Togglable btnLabel='view' btnCloneLabel='close' className='togglable-content'>
        <div>
          <p style={{ margin: '10px 0 5px' }}>URL: <a href="#">{url}</a></p>
          <p style={{ margin: '5px 0' }}>
            Likes {likes}
            <button
              onClick={onLike}
              style={{ marginInlineStart: '8px' }}>
              like</button>
          </p>
          <p style={{ margin: '5px 0' }}>{blog.user.name}</p>
          <button onClick={onRemove}>remove</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog