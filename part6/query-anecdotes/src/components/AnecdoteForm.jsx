import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postAnecdote } from "../services/anecdotes_api"
import { useNotificationContext } from "../context/useNotificationContext"
import Notification from "./Notification"

const AnecdoteForm = () => {
  const { setNotification } = useNotificationContext()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: postAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], anecdotes => anecdotes.concat(newAnecdote))
      setNotification({ message: 'Anecdote created' })
    },
    onError: (res) => {
      const error =
        res.response?.data?.error || res.message || "Something went wrong";
      setNotification({ message: error, type: "error" });
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <>
      <Notification />
      <div style={{ marginBottom: "20px "}}>
        <h2>create new</h2>
        <form onSubmit={onCreate}>
          <input name='anecdote' />
          <button type="submit">create</button>
        </form>
      </div>
    </>
  )
}

export default AnecdoteForm
