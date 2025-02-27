const Anecdote = ({ anecdote, fVote }) => {
  const { content, votes } = anecdote

  return (
    <div>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={() => fVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote