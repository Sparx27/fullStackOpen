import { createSlice } from '@reduxjs/toolkit'
import { getAllBlogs, postBlog, deleteBlog, likeBlog, postComment } from '../../services/blogs'
import { createNotification } from './notificationSlice'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => [...state, action.payload],
    removeBlog: (state, action) => state.filter(b => b.id !== action.payload),
    updateBlog: (state, action) => {
      const { payload } = action
      return state.map(b => b.id === payload.id ? payload : b)
    }
  }
})

export const { setBlogs, addBlog, removeBlog, updateBlog } = blogsSlice.actions

export const actionLikeBlog = (id, user) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await likeBlog(id, user)
      dispatch(updateBlog(updatedBlog))
      dispatch(createNotification(`${updatedBlog.title} liked!`))
    }
    catch(err) {
      console.log(err)
      const message = err.data?.message || 'Server error'
      dispatch(createNotification(message, 'error'))
    }
  }
}

export const setAllBlogs = () => {
  return async (dispatch) => {
    try {
      const data = await getAllBlogs()
      dispatch(setBlogs(data))
    }
    catch(err) {
      const message = err.data.message || 'Server error'
      dispatch(createNotification(message, 'error'))
    }
  }
}

export const addNewBlog = (newBlog, user) => {
  return async (dispatch) => {
    try {
      const data = await postBlog(newBlog, user)
      dispatch(addBlog(data))
      dispatch(createNotification(`New blog "${data.title}" by ${data.author} added`))
    }
    catch(err) {
      const message = err.data.message || 'Server error'
      dispatch(createNotification(message, 'error'))
    }
  }
}

export const actionDeleteBlog = (id, user) => {
  return async (dispatch) => {
    try {
      await deleteBlog(id, user)
      dispatch(removeBlog(id))
      dispatch(createNotification('Blog deleted'))
      return true
    }
    catch(err) {
      const message = err.data?.message || 'Server error'
      dispatch(createNotification(message, 'error'))
      return false
    }
  }
}

export const actionAddComment = (blogId, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await postComment(blogId, comment)
      dispatch(updateBlog(updatedBlog))
      return true
    }
    catch(err) {
      const message = err.data?.message || 'Server error'
      dispatch(createNotification(message, 'error'))
      return false
    }
  }
}

export default blogsSlice.reducer