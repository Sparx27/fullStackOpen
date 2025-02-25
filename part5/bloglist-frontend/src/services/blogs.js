import axios from 'axios'
const baseUrl = '/api/blogs'

export const getAllBlogs = async () => {
  try {
    const { data } = await axios.get(baseUrl)
    return data
  }
  catch(err) {
    return Promise.reject(err.response?.data ?? 'Server error')
  }
}

export const postBlog = async (blog, user) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    }
    const { data } = await axios.post(baseUrl, blog, config)
    return data
  }
  catch(err) {
    return Promise.reject(err.response?.data ?? 'Server error')
  }
}

export const likeBlog = async (blog, user) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    }
    const { data } = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
    return data
  }
  catch(err) {
    return Promise.reject(err.response?.data ?? 'Server error')
  }
}

export const removeBlog = async (blog, user) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    }
    await axios.delete(`${baseUrl}/${blog.id}`, config)
  }
  catch(err) {
    return Promise.reject(err.response?.data ?? 'Server error')
  }
}