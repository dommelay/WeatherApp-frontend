import axios from 'axios'
import { useState, useEffect } from 'react'
import Display from './Refresh'
const moment = require('moment')

const City = (props) => {
    const [showMore, setShowMore] = useState(false)

    const handleShowMore = () => {
        setShowMore(!showMore)
        handleRefreshCity();
    }

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
            axios.put(`http://localhost:3000/cities/${props.city._id}`, updatedCity).then(()=> {
                props.getCities()
            })
        })
    }
    useEffect(() => {
        handleRefreshCity();
    }, [])
    return(
        <div>
            
            
         <div className='citydisplay'>
            <div class="nav">
                <button onClick={handleRefreshCity}>Refresh</button>
                <button id='deletebttn' onMouseEnter={handleRefreshCity} onClick={handleDelete}>Delete</button>
                <button onClick={handleShowMore}>Show More</button>
            </div>
            <div>
                <h1>{props.city.name}</h1>
                <img src={"http://openweathermap.org/img/wn/" + props.city.weatherIcon + "@2x.png"} alt='weather icon'/>
                <h3>{props.city.temp}°</h3>
                <h3>{props.city.time}</h3>
            </div>
            {showMore ?
            <>
                <h3>{props.city.tempMin}</h3>
                <h3>{props.city.tempMax}</h3>
                <button onClick={handleShowMore}>Show Less</button>
            </>
            :<></>}
        </div>
            
            
        </div>
    )
}
export default City
