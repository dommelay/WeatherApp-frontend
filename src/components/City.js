import axios from 'axios'
import { useState } from 'react'
const City = (props) => {

    const handleDelete = () => {
        axios.delete(`http://localhost:3000/cities/${props.city._id}`).then(() => {
            props.getCities();
        })
    }
    return(
        <div className='citydisplay'>
            {props.city ? <>
            <h1>{props.city.name}</h1>
            <img src={"http://openweathermap.org/img/wn/" + props.city.weatherIcon + "@2x.png"} alt='weather icon'/>
            <button onClick={handleDelete}>Delete</button></>
            : <></>}
        </div>
    )
}
export default City