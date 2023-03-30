import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Add from './components/Add'

const App = () =>  {
 const [cities, setCities] = useState([])

 const getCities = () => {
  axios.get('http://localhost:3000/cities').then((response) => {
    setCities(response.data)
    console.log(response)
  })
 }
 useEffect(() => getCities, [])

  return (
    <div>
        <Add/>
        {cities.map((city) => {
          return (
            <>
            <h1>{city.name}</h1>
            <h1>{city.time}</h1>
            </>
          )
        })}
        <>
      </>
    </div>
  );
}

export default App;
