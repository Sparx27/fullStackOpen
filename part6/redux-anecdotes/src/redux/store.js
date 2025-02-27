import { configureStore } from '@reduxjs/toolkit'
import anecdotesSlice from './reducers/anecdotesSlice'
import filterSlice from './reducers/filterSlice'
import notificationSlice from './reducers/notificationSlice'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesSlice,
    filter: filterSlice,
    notification: notificationSlice
  }
})

export default store
