import { useEffect, useState } from 'react'
import { getAllCountry } from './services/country'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getAllCountry()
      .then(data => setCountries(data))
  }, [])
  
  let countryToShow = filter === '' ? [] : countries.filter(a => a.name.official.toLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <>
      <div>
        find countries <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <Countries countries={countryToShow} setFilter={setFilter} />
    </>
  )
}

export default App
