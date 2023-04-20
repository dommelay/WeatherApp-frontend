import {useState, useEffect} from 'react'
import axios from 'axios'
const moment = require('moment')

const Refresh = (props) => {
    
    const handleRefreshAll = () => {
        {props.cities.map((city) => {
        for (let i = 0; i < props.cities.length; i++) {
            axios.get(`${city.url}`).then((response) => {
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
                    url: city.url,
                    backgroundImageUrl: response.data.weather[0].id
                }
                axios.put(`https://serene-eyrie-94543.herokuapp.com/cities/${city._id}`, updatedCity).then(()=> {
                    props.getCities()
                })
            })
        }
    })}
    }
    // useEffect(() => {
    //     handleRefreshAll();
    //     props.getCities();
    // })
    return (
        
        <div id="refreshDiv">
            <button id="refreshAllBttn" onClick={handleRefreshAll}>Refresh Cities</button>
        </div>
    )
}

export default Refresh