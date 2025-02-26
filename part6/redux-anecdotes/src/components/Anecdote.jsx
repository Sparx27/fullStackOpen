const Anecdote = ({ anecdote, fVote }) => {
  const { id, content, votes } = anecdote

  return (
    <div>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={() => fVote(id)}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote