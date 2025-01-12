import axios from "axios"

export const getAllCountry = () => axios
  .get('https://studies.cs.helsinki.fi/restcountries/api/all')
  .then(res => res.data)

export const getCountry = (name) => axios
  .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
  .then(res => res.data)