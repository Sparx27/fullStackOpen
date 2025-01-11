import { useState } from "react"

const Form = ({ onAddPerson }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onAddPerson({ newName, newNumber })
    setNewName('')
    setNewNumber('')
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new</h2>
      
      <div style={{marginBottom: "5px"}}>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} required />
      </div>
      <div style={{marginBottom: "5px"}}>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form