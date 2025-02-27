import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

export const getAllAnecdotes = async () => {
  const { data } = await axios.get(BASE_URL)
  return data
}

export const postAnecdote = async (content) => {
  const res = await axios.post(BASE_URL, {
    content,
    votes: 0
  })
  return res.data
}

export const putVoteAnecdote = async (anecdote) => {
  const res = await axios.put(`${BASE_URL}/${anecdote.id}`, {
    content: anecdote.content,
    votes: anecdote.votes + 1
  })
  return res.data
}