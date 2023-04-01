import axios from 'axios'
import { useState } from 'react'
const moment = require('moment')

const City = (props) => {
const [currentCity, setCurrentCity] = useState(props.city)

    const handleDelete = () => {
        axios.delete(`http://localhost:3000/cities/${props.city._id}`).then(() => {
            props.getCities();
        })
    }
    const handleRefreshCity = () => {
        axios.get(`${props.city.url}`).then((response) => {
            const time = response.data.timezone
            const timeMin = time / 60
            const currentTime = moment().utcOffset(timeMin).format("h: mm A")
            const updatedCity = {
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
                cloud: response.data.clouds.all,
                url: props.city.url
            }
            setCurrentCity(updatedCity)
            axios.put(`http://localhost:3000/cities/${props.city._id}`, updatedCity).then(()=> {
                props.getCities()
            })
        })
    }
    return(
        <div className='citydisplay'>
            {currentCity ? <>
            <h1>{currentCity.name}</h1>
            <h3>Temperature: {currentCity.temp}</h3>
            <h3>{currentCity.time}</h3>
            <img src={"http://openweathermap.org/img/wn/" + currentCity.weatherIcon + "@2x.png"} alt='weather icon'/>
            <button onClick={handleRefreshCity}>Refresh</button>
            <button onClick={handleDelete}>Delete</button></>
            : <></>}
        </div>
    )
}
export default City