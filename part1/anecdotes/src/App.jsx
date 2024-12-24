import { useState } from "react"
import Button from "./components/Button"
import Anecdote from "./components/Anecdote"


function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    votesCount: new Array(anecdotes.length).fill(0),
    top: 0
  })

  function getRandomeInt(max) {
    return Math.floor(Math.random() * max)
  }

  function handleClick() {
    const newVotes = {
      votesCount: [...votes.votesCount],
      ...votes
    }
    newVotes.votesCount[selected]++
    newVotes.top = calcTop()
    setVotes(newVotes)
  }

  function calcTop() {
    let max = 0
    let posMax = 0
    const { votesCount } = votes

    for(let i = 0; i < votes.votesCount.length; i++) {
      if(votesCount[i] > max) {
        max = votesCount[i]
        posMax = i
      }
    }
    
    return posMax
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes.votesCount[selected]} />
      <Button text="vote" onClick={handleClick} />
      <Button text="next anecdote" onClick={() => setSelected( getRandomeInt(anecdotes.length) )} />

      <h2>Anecdote with most votes</h2>
      <Anecdote text={anecdotes[votes.top]} votes={votes.top} />
    </>
  )
}

export default App
