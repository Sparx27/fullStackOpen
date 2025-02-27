import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const { data } = await axios.get(BASE_URL)
  console.log(data)
  return data
}

export const createOne = async (content) => {
  const res = await axios.post(BASE_URL, {
    content,
    votes: 0
  })
  return res.data
}

export const fetchVoteAnecdote = async (anecdote) => {
  const res = await axios.put(`${BASE_URL}/${anecdote.id}`, {
    content: anecdote.content,
    votes: anecdote.votes + 1
  })
  return res.data
}