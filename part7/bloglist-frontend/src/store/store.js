import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './slices/notificationSlice'
import blogsSlice from './slices/blogsSlice'
import userSlice from './slices/userSlice'

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogsSlice,
    user: userSlice
  }
})

export default store