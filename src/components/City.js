import axios from 'axios'
import { useState, useEffect } from 'react'
import Display from './Refresh'
const moment = require('moment')

const City = (props) => {
    const [showMore, setShowMore] = useState(false)

    const handleShowMore = () => {
        setShowMore(!showMore)
        // handleRefreshCity();
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
            // const image = 'i'
            // const weatherBack = response.data.weather[0].id
            // if (weatherBack === 800) {
            //     const image = 'https://img.freepik.com/free-vector/sky-background-with-rainfall-droplets_1017-32182.jpg?w=2000&t=st=1681054218~exp=1681054818~hmac=965260e24afe56170a5e0d6467e3a881f5e7c68818ed090ab52c25825ba45048'
            // }
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
                url: props.city.url,
                backgroundImageUrl: response.data.weather[0].id
            }
            axios.put(`http://localhost:3000/cities/${props.city._id}`, updatedCity).then(()=> {
                props.getCities()
            })
        })
    }
    // useEffect(() => {
    //     handleRefreshCity();
    // }, [])
    useEffect(() => {
        console.log(props.city)
    }, [])
    return(
        <div>  
         {/* <div className='citydisplay' style={{ backgroundImage:`url(https://img.freepik.com/free-vector/sky-background-with-rainfall-droplets_1017-32182.jpg?w=2000&t=st=1681054218~exp=1681054818~hmac=965260e24afe56170a5e0d6467e3a881f5e7c68818ed090ab52c25825ba45048)`,backgroundRepeat:"no-repeat", backgroundSize: "cover" }}> */}
         <div onClick={handleShowMore} className = 'citydisplay'>
            <div class="nav">
                {/* <button onClick={handleRefreshCity}>Refresh</button> */}
                <div class='pic'>
                <img src={"http://openweathermap.org/img/wn/" + props.city.weatherIcon + "@2x.png"} alt='weather icon'/>
                </div>
            </div>
            <div class='cityinfo'>
                <div>
                    <h1 class='citytext'>{props.city.name}</h1>
                    <h1 class='temptext'>{props.city.temp}°</h1>
                </div>
                <div class='timedescrip'>
                    <h1 class='timetext'>{props.city.time}</h1>
                    <h2 class='description'>{props.city.weatherMain}</h2>
                </div>
            </div>
            {showMore ?
            <>
                <div class='properties'>
                <div class='property'>
                    <h3>High</h3>
                    <h1>{props.city.tempMax}°</h1>
                </div>
                <div class='property'>
                    <h3>Low</h3>
                    <h1>{props.city.tempMin}°</h1>
                </div>
                {/* <div class='property'>
                    <h3>Feels like</h3>
                    <h1>{props.city.tempFeels}°</h1>
                </div> */}
                <div class='property'>
                    <h3>Wind Speed </h3>
                    <h1>{props.city.windSpeed} mph</h1>
                </div>
                <div class='property'>
                    <h3>Humidity</h3>
                    <h1>{props.city.humidity} %</h1>
                </div>
                <div class='property'>
                    <h3>Cloudiness</h3>
                    <h1>{props.city.cloud} %</h1>
                </div>
            </div>
            <div id='deletebttn'>
                <button onClick={handleDelete}>Delete City</button>
            </div>
            </>
            :<></>}
        </div>
            
            
        </div>
    )
}
export default City
