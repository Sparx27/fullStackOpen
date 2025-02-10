const express = require('express')
const morgan = require('morgan')

/* let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
] */

function generateId() {
  const newId = Math.floor(Math.random() * 10000 + 1)
  const checkIds = persons.map(p => p.id)
  return checkIds.find(i => i === newId) ? generateId() : newId
}

const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req, res) => req.method === "POST" ? JSON.stringify(req.body) : ' ')

app.use(morgan(':method :url :status :response-time :body'))

app.get('/api/persons', (req, res) => res.json(persons))

app.get('/info', (req, res) => {
  const time = new Date().toString()
  const peopleCounter = persons.length
  res.send(`
    <p>Phonebook has info for ${peopleCounter} people</p>
    <p>${time}</p>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if(!person) return res.status(404).json({ message: 'Person not found' })
  
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if(!person) return res.status(404).json({ message: 'Person not found for deletion' })
  
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const { body } = req
  if(!body || !body.name || !body.number) return res.status(400).send({ message: 'Content missing' })

  const personExists = persons.find(p => p.name === body.name)
  if(personExists) return res.status(409).json({ message: "Name already exists" })

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  persons.push(newPerson)
  res.status(201).json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})