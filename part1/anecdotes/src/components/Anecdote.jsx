const Anecdote = ({ text, votes }) => (
  <article>
    <p>{text}</p>
    <p>Has {votes} votes</p>
  </article>
)

export default Anecdote