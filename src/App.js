import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const App = () =>  {
 const [zip, setZip] = useState('')
 const [state, setState] = useState('')
 const [city, setCity] = useState('')

  const getWeather = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${state}&appid=8e6c1243aeb41a312c229cfda8bc51e3`).then((response) => {
      console.log(response.data.main)
      setCity(response.data.main)
    })
  }
  const handleZip = (event) => {
    setZip(event.target.value)
  }
  const handleState = (event) => {
    setState(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    getWeather()
  }

  return (
    <div>
      <h1>Weather</h1>
      <h2>Temperature: {city.temp}</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' name='zip' onChange={handleZip}></input>
        <input type='text' name='state' onChange={handleState}></input>
        <input type='submit'></input>
      </form>
    </div>
  );
}

export default App;
