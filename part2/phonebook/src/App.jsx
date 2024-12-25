import { useState } from 'react'
import { generateId } from './utils/utils'
import Form from './components/Form'
import Filter from './components/Filter'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { id: generateId(), name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [filter, setFilter] = useState('')

  let personsToShow = filter === '' ? persons : persons.filter(p => p.name.toLowerCase().includes(filter))

  function onAddPerson(personData) {
    const { newName, newNumber } = personData

    if(persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = { id: generateId(), name: newName, number: newNumber }
      setPersons([ ...persons, newPerson ])
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Form onAddPerson={onAddPerson} />
      <Numbers personsToShow={personsToShow} />
    </div>
  )
}

export default App
