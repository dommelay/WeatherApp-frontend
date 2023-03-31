import {useState} from 'react'
import axios from 'axios'
const moment = require('moment')

const Add = (props) => {
  const [zip, setZip] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState({})

  const handleZip = (event) => {
    setZip(event.target.value)
  }
  const handleState = (event) => {
    setState(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${state}&appid=8e6c1243aeb41a312c229cfda8bc51e3&units=imperial`).then((response) => {
        const time = response.data.timezone
        const timeMin = time / 60
        const currentTime = moment().utcOffset(timeMin).format("h: mm A")
        const newCity = {
            name: response.data.name,
            temp: response.data.main.temp,
            tempMax: response.data.main.temp_max,
            tempMin: response.data.main.temp_min,
            tempFeels: response.data.main.feels_like,
            time: currentTime,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            weatherMain: response.data.weather[0].main,
            weatherDescription: response.data.weather[0].description,
            weatherIcon: response.data.weather[0].icon,
            cloud: response.data.clouds.all
        }
        setCity(newCity)
        
    }).then(() => {
        axios.post('http://localhost:3000/cities', city).then(()=> {
            props.getCities()
        })
    })
 
  }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type='text' name='zip' onChange={handleZip}></input>
                <input type='text' name='state' onChange={handleState}></input>
                <input type='submit'></input>
            </form>
        </>
    )

}

export default Add 