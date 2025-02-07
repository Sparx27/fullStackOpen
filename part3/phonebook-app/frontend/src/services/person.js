import axios from "axios";

export const getAllPerson = () => axios
  .get('/api/persons')
  .then(res => res.data)

export const addPerson = (newPerson) => axios
  .post('api/persons', newPerson)
  .then(res => res.data)

export const deletePerson = (id) => axios
  .delete(`api/persons/${id}`)

export const updatePerson = (person) => axios
  .put(`api/persons/${person.id}`, person)
  .then(res => res.data)