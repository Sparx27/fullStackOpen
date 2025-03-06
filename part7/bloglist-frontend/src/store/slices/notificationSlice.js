import { createSlice } from '@reduxjs/toolkit'

const notificationRef = {
  current: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      const { payload } = action
      return {
        message: payload.message,
        type: payload.type || 'success'
      }
    },
    clearNotification: (state, action) => null
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const createNotification = (message, type = 'success', time = 5) => {
  return (dispatch) => {
    dispatch(setNotification({ message, type }))

    if(notificationRef.current) clearTimeout(notificationRef.current)

    if(time !== 0) {
      notificationRef.current = setTimeout(() => {
        dispatch(clearNotification())
      }, time * 1000)
    }
  }
}

export default notificationSlice.reducer