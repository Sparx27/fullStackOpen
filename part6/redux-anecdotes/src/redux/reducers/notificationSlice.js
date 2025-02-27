import { createSlice } from '@reduxjs/toolkit'

const notification = {
  current: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: ''
  },
  reducers: {
    setNotification(state, action) {
      return { ...state, message: action.payload }
    },
    clearNotification(state) {
      return { ...state, message: '' }
    }
  }
})

export const {
  setNotification,
  clearNotification
} = notificationSlice.actions

export const showNotification = (message, seconds = 5) => {
  return (dispatch) => {
    dispatch(setNotification(message))

    if(notification.current) clearTimeout(notification.current)

    notification.current = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer