import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(name) {
      setLoading(true)
      fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`, {
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        setCountry(data)
      })
      .catch(err => console.log('ERROR', err))
      .finally(() => setLoading(false))
    }
  }, [name])

  return { country, loading }
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if(country.error) {
    return <p>{country.error}</p>
  }

  return (
    <div>
      <h3>{country.name?.official || 'no data'}</h3>
      <div>capital {country.capital ? country.capital[0] : 'no data'}</div>
      <div>population {country.population || 'no data'}</div> 
      <img src={country.flags?.png} height='100' alt={`${country.flags?.alt}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const { loading, country } = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      {loading ? <p>Loading...</p> : <Country country={country} />}
    </div>
  )
}

export default App