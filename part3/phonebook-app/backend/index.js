require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./mongo.js')

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
] 

function generateId() {
  const newId = Math.floor(Math.random() * 10000 + 1)
  const checkIds = persons.map(p => p.id)
  return checkIds.find(i => i === newId) ? generateId() : newId
} */

const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => req.method === "POST" ? JSON.stringify(req.body) : ' ')
app.use(morgan(':method :url :status :response-time :body'))

app.get('/info', (req, res, next) => {
  const time = new Date().toString()
  Person.find({}).then(result => res.send(`
    <p>Phonebook has info for ${result.length} people</p>
    <p>${time}</p>
  `))
    .catch(err => next(err))
})

app.get('/api/persons', (req, res, next) => Person.find({}).then(result => res.json(result))
  .catch(err => next(err)))
    
app.get('/api/persons/:id', (req, res, next) => Person.findById(req.params.id).then(result => {
  if(!result) return res.status(404).json({ message: 'Person not found' })
  res.json(result)
})
  .catch(err => next(err)))

app.post('/api/persons', (req, res) => {
  const { body } = req
  //if(!body || !body.name || !body.number) return res.status(400).send({ message: 'Content missing' })

  Person.find({ name: body.name }).then(result => {
    if(result.length > 0) return res.status(409).json({ message: "Name already exists" })

    const newPerson = new Person({
      name: body.name,
      number: body.number
    })

    newPerson.save()
      .then(result => res.status(201).json(result))
      .catch(err => {
        const { message } = err
        res.status(400).json({ message: message?.substring(message.lastIndexOf(':') + 1) || 'Error saving Person' })
      })
  })})

app.delete('/api/persons/:id', (req, res, next) => Person.findByIdAndDelete(req.params.id)
  .then(() => res.status(204).end())
  .catch(err => next(err)))

app.put('/api/persons/:id', (req, res) => {
  if(!req.body || !req.body.name || !req.body.number) return res.status(400).json({ message: 'Content missing' })

  const { name, number } = req.body
  Person.findByIdAndUpdate(req.params.id, { name, number }, {
    new: true,
    runValidators: true
  })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(err => {
      const { message } = err
      res.status(400).json({ message: message?.substring(message.lastIndexOf(':') + 1) || 'Error updating Person' })
    })
})

const unknownEndpoint = (req, res) => res.status(404).json({ message: `ERROR: unknown endpoint: ${req.path}`})

app.use(unknownEndpoint)

/*********** ERROR HANDLER ***********/
const handleErrors = (error, req, res, next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return res.status(400).json({ message: 'Malformmated ID' })
  }

  next(error)
}
/*********** ERROR HANDLER ***********/

app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})
