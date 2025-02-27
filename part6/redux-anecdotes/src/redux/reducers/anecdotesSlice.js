import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const setId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: setId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addnewAnecdote: (state, action) => {
      const { payload } = action
      return [...state, asObject(payload)]
    },
    voteAnecdote: (state, action) => {
      const { payload } = action
      return state.map(a => a.id === payload ? { ...a, votes: a.votes + 1 } : a)
    }
  }
})

/* const reducer = (state = initialState, action) => {
  const { type, payload } = action

  if(type === 'ADDNEW') return [...state, payload]
  if(type === 'VOTE') return state.map(a => a.id === payload.id ? { ...a, votes: ++a.votes } : a)
  return state
}

export const addNote = (content) => {
  return {
    type: 'ADDNEW',
    payload: asObject(content)
  }
}

export const voteNote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
} */

export const {
  addnewAnecdote,
  voteAnecdote
} = anecdotesSlice.actions

export default anecdotesSlice.reducer