const Anecdote = ({ anecdote }) => {
  const { content, author, info, votes } = anecdote

  return (
    <div>
      <h2>{content} by {author}</h2>
      <p>Has {votes} votes</p>
      <p>For more info see <a href={info}>{info}</a></p>
    </div>
  )
}

export default Anecdote