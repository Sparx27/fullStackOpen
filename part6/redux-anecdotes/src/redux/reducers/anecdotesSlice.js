import { createSlice } from '@reduxjs/toolkit'
import { getAllAnecdotes, postAnecdote, putVoteAnecdote } from '../../services/anecdotes_api'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes: (state, action) => {
      return action.payload
    },
    appendAnecdote: (state, action) => {
      const { payload } = action
      return [...state, payload]
    },
    updateVotesAnecdote: (state, action) => {
      const votedAnecdote = action.payload
      return state.map(a => a.id === votedAnecdote.id ? votedAnecdote : a)
    }
  }
})

export const {
  setAnecdotes,
  appendAnecdote,
  updateVotesAnecdote
} = anecdotesSlice.actions

export const initialiceAnecdotes = () => {
  return async (dispatch) => {
    try {
      const anecdotes = await getAllAnecdotes()
      dispatch(setAnecdotes(anecdotes))
    }
    catch(err) {
      return Promise.reject(err.message)
    }
  }
}

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    try {
      const returnedAnecdote = await postAnecdote(content)
      dispatch(appendAnecdote(returnedAnecdote))
    }
    catch(err) {
      return Promise.reject(err.message)
    }
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    try {
      const updatedAnecdote = await putVoteAnecdote(anecdote)
      dispatch(updateVotesAnecdote(updatedAnecdote))
    }
    catch(err) {
      return Promise.reject(err.message)
    }
  }
}

export default anecdotesSlice.reducer