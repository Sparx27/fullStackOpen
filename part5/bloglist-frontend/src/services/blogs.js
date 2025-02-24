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