import React, { useEffect, useState } from "react";
import { Header, WeatherDisplay } from "./components/SiteBuilder";
import "./App.css";

function App() {
  const [weather, updateWeather] = useState({
    temp: 0,
    tempMax: 0,
    tempMin: 0,
    feelsLike: 0,
    humidity: 0,
    sky: '',
    location: "Chicago",
  });

  const [celsiusOrFahrenheit, updateCelsiusOrFahrenheit] = useState(false);
  const [degreeMarker, updateDegreeMarker] = useState("F");

  // make an API call using the default location (Chicago, the best city on Earth)
  useEffect(() => {
    getWeather();
  }, [celsiusOrFahrenheit])

  // changes the temp measurement from Celsiuse (true) and Fahrenheit (false)
  // then uses another API call to get the updated weather data
  const changeTempMeasurement = () => {
    if (celsiusOrFahrenheit) {
      const change = false;
      updateCelsiusOrFahrenheit(change);
    } else {
      const change = true;
      updateCelsiusOrFahrenheit(change);
    }
  };

  // converts the API called data from Kelvin to the current selected measurement
  const convertFromKelvin = (temp) => {
    const kelvin = 273.15;
    if (celsiusOrFahrenheit) {
      const newTemp = Math.round(temp - kelvin);
      const celsius = "C";
      updateDegreeMarker(celsius);
      return newTemp;
    } else {
      const newTemp = Math.round((temp - kelvin) * 1.8 + 32);
      const fahrenheit = "F";
      updateDegreeMarker(fahrenheit);
      return newTemp;
    }
  };

  // makes the API call and sets the data into the state variables
  const getWeather = async () => {
    const cityName = weather.location;
    const apiKey = "3a0e7e455c0a21e0b314e046ad8e27d0";
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    // fetch the weather data
    try {
      const response = await fetch(api, { mode: "cors" });
      const weather = await response.json();
      console.log(weather);
      const returnData = {
        temp: convertFromKelvin(weather.main.temp),
        tempMax: convertFromKelvin(weather.main.temp_max),
        tempMin: convertFromKelvin(weather.main.temp_min),
        feelsLike: convertFromKelvin(weather.main.feels_like),
        humidity: weather.main.humidity,
        sky: weather.weather[0].main,
        location: weather.name,
      };

      updateWeather(returnData);
    } catch (error) {
      alert(error);
    }
  };

  // gets the value of the city from the input bar to use for the API call
  const setNewCity = (props) => {
    const city = { location: props };
    const newCityArray = Object.assign(weather, city);
    updateWeather(newCityArray);
    getWeather();
  };

  return (
    <div className="main">
      <Header
        degree={celsiusOrFahrenheit}
        changeTempMeasurement={changeTempMeasurement}
      />
      <WeatherDisplay main={weather} degree={degreeMarker} />
      <WeatherSearch onSearch={getWeather} handleChange={setNewCity} />
    </div>
  );
}

// enable the search bar
function WeatherSearch(props) {
  const handleTextInput = (event) => {
    event.preventDefault();
    props.handleChange(event.target[0].value);
  };

  return (
    <div className="searchBar">
      <form onSubmit={handleTextInput}>
        <label>Search for weather:</label>
        <input type="text" id="search" value={props.location}></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default App;
