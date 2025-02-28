import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAllAnecdotes } from './services/anecdotes_api'
import AnecdoteList from './components/AnecdoteList'
import { useNotificationContext } from './context/useNotificationContext'
import { useEffect } from 'react'

const App = () => {
  const { notification, notificationDispatch } = useNotificationContext()

  async function sortedAnecdotes() {
    const anecdotes = await getAllAnecdotes()
    return anecdotes.sort((a,b) => b.votes - a.votes)
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: sortedAnecdotes,
    refetchOnWindowFocus: false,
    retry: 2,
  })

  const anecdotes = data

  useEffect(() => {
    if(isError) {
      notificationDispatch({
        type: 'SET',
        payload: {
          message: 'Anecdotes service not available due to problems with server',
          type: 'error'
        }
      })
    }
  }, [isError])

  return (
    <div>
      <h1>Anecdote app</h1>
      {
        isError
            ? <Notification />
            : isLoading
              ? <AnecdoteList anecdotes={anecdotes} isLoading={isLoading} />
              : <>
                <AnecdoteForm />
                <AnecdoteList anecdotes={anecdotes} isLoading={isLoading} />
              </>
      }
    </div>
  )
}

export default App
