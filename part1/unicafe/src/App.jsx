import { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give feedback</h1>
      <div>
        <Button text={"good"} onClick={() => setGood(good +1)} />
        <Button text={"neutral"} onClick={() => setNeutral(neutral +1)} />
        <Button text={"bad"} onClick={() => setBad(bad +1)} />
      </div>

      <Statistics stats={{good, neutral, bad}} />
    </>
  )
}

export default App
