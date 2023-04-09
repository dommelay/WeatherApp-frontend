import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Add from './components/Add'
import City from './components/City'
import Refresh from './components/Refresh'

const App = () =>  {
 const [cities, setCities] = useState([])

 const getCities = () => {
  axios.get('http://localhost:3000/cities').then((response) => {
    setCities(response.data)
    console.log(response)
  })
 }

 useEffect(() => {
 getCities() }, [])

  return (
    <div>
      
            <Add getCities={getCities}/>
            
          
        {cities.map((city) => {
          return (
            <div class="citybox">
            <City city={city} getCities={getCities}/>
            </div>
          )
        })}
        <Refresh cities={cities} getCities={getCities}/>
        
    </div>
  );
}

export default App;

