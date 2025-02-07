import { useEffect, useState } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import { addPerson, deletePerson, getAllPerson, updatePerson } from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({})

  let personsToShow = filter === '' ? persons : persons.filter(p => p.name.toLowerCase().includes(filter))

  useEffect(() => {
    getAllPerson()
      .then(data => setPersons(data))
      .catch(err => showNotification(`${(err.response?.data?.message ?? 'Error fetching data')}`, 'n-error'))
  }, [])

  function showNotification(message, type = 'n-success') {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: ''})
    }, 2500)
  }

  function onAddPerson(personData) {
    const { newName, newNumber } = personData

    const existPerson = persons.find(p => p.name === newName)

    if(existPerson) {
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        updatePerson({ ...existPerson, number: newNumber })
          .then(data => {
            setPersons(persons.map(p => p.id === existPerson.id ? data : p))
            showNotification(`${newName} updated`)
          })
          .catch(err => showNotification(`${err.response.data.message}`, 'n-error'))
    }
    else {
      const newPerson = { name: newName, number: newNumber }
      addPerson(newPerson)
        .then(data => {
          setPersons([ ...persons, data ])
          showNotification(`${newName} added`)
        })
        .catch(err => showNotification(`${err.response.data.message}`, 'n-error'))
    }
  }

  function onDeletePerson(id) {
    deletePerson(id)
      .then(data => {
        showNotification("Person deleted")
        setPersons(persons.filter(p => p.id != id))
      })
      .catch(err => showNotification(`${err.response.data.message}`, 'n-error'))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <Form onAddPerson={onAddPerson} />
      <Numbers personsToShow={personsToShow} actions={{ onDeletePerson }} />
    </div>
  )
}

export default App
