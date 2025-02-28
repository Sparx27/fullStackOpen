import axios from "axios"

const BASE_URL = 'http://localhost:3001/anecdotes'

export const getAllAnecdotes = () => axios.get(BASE_URL).then(res => res.data)

export const postAnecdote = (content) => 
  axios.post(BASE_URL, { content, votes: 0 }).then(res => res.data)

export const voteAnecdote = ({ id, content, votes }) =>
  axios.put(`${BASE_URL}/${id}`, { content, votes: votes + 1 })
  .then(res => res.data)