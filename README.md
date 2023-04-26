# Weather App
https://domsweatherapp.netlify.app/

A weather application which allows users to obtain weather information from cities around the world through search by zip code and country.vThe application utilizes an OpenWeather API. The technologies used include MongoDB, Express.js, React, Node.js (MERN stack), RESTful API, HTML, and CSS. Link to back end: https://github.com/dommelay/WeatherApp-backend. See Developer Notes.
## Developer Notes

This application uses two APIs, one RESTful and one third party. The user enters their zip code and a two letter country code which are then passed into the API call as search parameters. The data in the response will be used to populate the schema created on the backend. The zip code and country will be stored as parameters within the url property. <br/><br/>
Saving the url is necesary for refresh (Update) operations. As a property of the object, the url can be easily accessed for a put request, without requiring users to enter search parameters again when attempting to update the current weather information. <br/><br/>
It is important to note that the application is capable of rendering current weather information in real time without a user event. This feature was disabled because this process involves infinite requests to the third party API. Approximatley 200 requests within an hour will result in a short-term ban on the developer's account. The refresh function is instead initiated by the click of a button.









