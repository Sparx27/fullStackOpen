import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { voteAnecdote } from '../services/anecdotes_api'
import { useNotificationContext } from '../context/useNotificationContext'

const AnecdoteList = ({ anecdotes, isLoading }) => {
  const { setNotification } = useNotificationContext()
  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (votedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => {
        return oldAnecdotes
          .map(a => a.id === votedAnecdote.id ? votedAnecdote : a)
          .sort((a,b) => b.votes - a.votes)
      })
      setNotification({ message: `anecdote '${votedAnecdote.content}' voted` })
    },
    onError: (res) => {
      const error =
        res.response?.data?.error || res.message || "Something went wrong";
      setNotification({ message: error, type: "error" });
    }
  })
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)
  }

  return (
    <div>
      {
        isLoading
          ? <p>Loading anecdotes</p>
          : anecdotes?.length > 0 && anecdotes.map(anecdote =>
            <div key={anecdote.id} style={{ marginBottom: "15px" }}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          )
      }
    </div>
  )
}

export default AnecdoteList