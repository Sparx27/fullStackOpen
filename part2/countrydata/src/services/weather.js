import axios from "axios"

export const getCityWeather = (lat, lon) => axios
  .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API}`)
  .then(res => res.data)