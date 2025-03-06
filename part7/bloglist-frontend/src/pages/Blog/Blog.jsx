import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionDeleteBlog, actionLikeBlog } from '../../store/slices/blogsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { getBlogById } from '../../services/blogs'
import Notification from '../../components/Notification'
import CommentForm from './CommentForm'

const Blog = ({ blog }) => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const btnLikeRef = useRef(null)

  const { id, title, author, url, likes, comments } = blog || {}

  async function onLike() {
    btnLikeRef.current.disabled = true
    await Promise.resolve(dispatch(actionLikeBlog(id, user)))
    btnLikeRef.current.disabled = false
  }

  async function onRemove() {
    if(window.confirm('Are you sure to delete this blog?')) {
      const result = await Promise.resolve(dispatch(actionDeleteBlog(id, user)))
      if(result) navigate('/blogs')
    }
  }

  return (
    <div className='container py-5'>
      <div className='mb-3'>
        <Notification />
      </div>
      {
        !blog
          ? <p className='mt-3 fs-5'>Loading...</p>
          : <>
            <h2 className='mb-3 fs-2' data-testid='blog-title-author'>
              <span className='fw-bold'>{title}</span>, <em>by {author}</em>
              <button className='btn btn-outline-danger me-2 d-inline ms-4' onClick={onRemove}>remove</button>
            </h2>
            <p>
              URL: <a href={`${url}`} target="_blank" rel="noopener noreferrer">{url}</a>
            </p>
            <p>
              {likes} likes
              <button
                ref={btnLikeRef}
                className='ms-2 btn btn-outline-light py-1 px-2 fs-6'
                onClick={onLike}
              >❤️</button>
            </p>
            <p>Blog posted by {blog.user.name}</p>
            <div className='mt-4'>
              <h3>Comments</h3>
              <ul>
                {
                  comments?.length > 0 && comments.map((a, i) =>
                    <li key={`${Math.floor(Math.random() * 5000) + i}`}>
                      {a}
                    </li>)
                }
              </ul>
              <div className='mt-2'>
                <CommentForm blogId={id} />
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default Blog