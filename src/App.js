import React, { useEffect, useState } from "react";
import { Header, WeatherDisplay } from "./components/SiteBuilder";
import "./App.css";

function App() {
  const [weather, updateWeather] = useState({
    temp: 0,
    tempMax: 0,
    tempMin: 0,
    feelsLike: 0,
    location: "Chicago",
  });

  const getWeather = async() => {
    const cityName = weather.location;
    const apiKey = "3a0e7e455c0a21e0b314e046ad8e27d0";
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    // fetch the weather data
    try {
      const response = await fetch(api, { mode: "cors" });
      const weather = await response.json();
      const returnData = {
        temp: weather.main.temp,
        tempMax: weather.main.temp_max,
        tempMin: weather.main.temp_min,
        feelsLike: weather.main.feels_like,
        location: weather.name}

      updateWeather(returnData);
      return returnData;
      
    } catch (error) {
      alert(error);
    }
    
  }

  const setNewWeather = (props) => {
    const city = {location: props};
    const newCityArray = Object.assign(weather, city);
    updateWeather(newCityArray);
    getWeather();

  }

  useEffect(() => {
    <WeatherDisplay main={weather} />
  }, [weather])



  return (
    <div className="main">
      <Header />
      <WeatherDisplay 
      main={weather} />
      <WeatherSearch
      onSearch={getWeather}
      handleChange={setNewWeather} />
    </div>
  );
}

function WeatherSearch(props) {

  const handleTextInput = (event) => {
    event.preventDefault();
    props.handleChange(event.target[0].value);
  }
  return (
    <div>
      <form onSubmit={handleTextInput}>
        <label>Search for weather:</label>
        <input type="text" 
        id="search"
        value={props.location}
        ></input>
        <button type="submit"
        >Search</button>
      </form>
    </div>
  );
}





export default App;
