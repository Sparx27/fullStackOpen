import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAllAnecdotes } from './services/anecdotes_api'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
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

  return (
    <div>
      <h1>Anecdote app</h1>
      {
        isError
            ? <Notification message='Anecdotes service not available due to problems with server' />
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
