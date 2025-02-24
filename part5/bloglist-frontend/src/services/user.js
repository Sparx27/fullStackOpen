import axios from "axios"

export const login = async (credentials) => {
  try {
    const { data } = await axios.post('/api/login', credentials)
    return data
  }
  catch(err) {
    return Promise.reject(err.response?.data ?? 'Server error')
  }
}