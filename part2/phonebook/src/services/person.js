import axios from "axios";

export const getAllPerson = () => axios
  .get('http://localhost:3001/persons')
  .then(res => res.data)

export const addPerson = (newPerson) => axios
  .post('http://localhost:3001/persons', newPerson)
  .then(res => res.data)

export const deletePerson = (id) => axios
  .delete(`http://localhost:3001/persons/${id}`)

export const updatePerson = (person) => axios
  .put(`http://localhost:3001/persons/${person.id}`, person)
  .then(res => res.data)