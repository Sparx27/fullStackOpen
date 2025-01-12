import { useEffect, useState } from "react"
import { getCityWeather } from "../services/weather"

const Countries = ({ countries, setFilter }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if(countries.length === 1) {
      const { capitalInfo } = countries[0]
      getCityWeather(capitalInfo.latlng[0], capitalInfo.latlng[1])
        .then(data => setWeather(data))
    }
    else {
      setWeather(null)
    }
  }, [countries])

  if(countries.length === 0) return null

  if(countries.length === 1) {
    const { name, capital, area, languages, flags } = countries[0]
    const langList = Object.entries(languages)
    
    return (
      <div>
        <h1>{name.common}</h1>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
        <p><b>Languajes</b></p>
        <ul>
          {langList.map(l => <li key={l[0]}>{l[1]}</li>)}
        </ul>
        <img src={flags.png} alt={`flag of ${name.common}`} />
        {
          weather && (
            <div>
              <h2>Weather in {capital}</h2>
              <p>temperature <b>{(weather.main.temp - 273.15).toFixed(2)} Celcius</b></p>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
              <p>wind {weather.wind.speed} m/s</p>
            </div>
          )
        }
      </div>
    )
  }

  if (countries.length > 10) return <div><p>Too many matches, specify another filter</p></div>

  return (
    <div>
      {
        countries.map(a => <div key={a.cca3}>
          <p><b>{a.name.common}</b></p>
          <button onClick={e => setFilter(a.name.common)}>show</button>
        </div>)
      }
    </div>
  )
}

export default Countries