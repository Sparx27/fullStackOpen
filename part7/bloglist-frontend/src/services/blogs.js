import axios from 'axios'
const baseUrl = '/api/blogs'

export const getAllBlogs = async () => {
  try {
    const { data } = await axios.get(baseUrl)
    return data
  }
  catch(err) {
    throw err.response
  }
}

export const getBlogById = async (id) => {
  try {
    const { data } = await axios.get(`${baseUrl}/${id}`)
    return data
  }
  catch(err) {
    throw err.response
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
    throw err.response
  }
}

export const likeBlog = async (id, user) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    }
    const { data } = await axios.patch(`${baseUrl}/${id}`, {}, config)
    return data
  }
  catch(err) {
    throw err.response
  }
}

export const deleteBlog = async (id, user) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    }
    await axios.delete(`${baseUrl}/${id}`, config)
  }
  catch(err) {
    console.log(err)
    throw err.response
  }
}

export const postComment = async (id, comment) => {
  try {
    const { data } = await axios.post(`${baseUrl}/${id}/comments`, { comment })
    return data
  }
  catch(err) {
    throw err.response
  }
}