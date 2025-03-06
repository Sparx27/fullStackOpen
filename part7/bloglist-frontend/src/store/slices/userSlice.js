import { createSlice } from '@reduxjs/toolkit'
import { login } from '../../services/user'
import { createNotification, setNotification } from './notificationSlice'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: (state, action) => null
  }
})

export const { setUser, clearUser } = userSlice.actions

export const logUser = (username, password) => {
  return async (dispatch) => {
    try {
      const data = await login({ username, password })
      localStorage.setItem('user', JSON.stringify(data))
      dispatch(setUser(data))
      return true
    }
    catch(data) {
      console.log('ERROR', data)
      dispatch(createNotification(data?.message ?? 'Something went wrong', 'error'))
      return false
    }
  }
}

export const clearLogUser = () => {
  return (dispatch) => {
    dispatch(clearUser())
    localStorage.removeItem('user')
  }
}

export default userSlice.reducer