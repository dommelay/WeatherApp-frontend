import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Add from './components/Add'
import City from './components/City'

//refresh button updates city object with new axios request
//refresh city info upon page load, useeffect
//let now = date.now
//if now = date.now { getcities } else { <></>}
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
            <>
            <City city={city}/>
            </>
          )
        })}
        <>
      </>
    </div>
  );
}

export default App;

