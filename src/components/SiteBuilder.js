
function Header(props) {

  const getMarker = () => {
    return (props.degree ? 'Fahrenheit' : 'Celsius')
  }

  const changeTemp = (event) => {
    event.preventDefault();
    props.changeTempMeasurement(event);
  }
  
  return (
    <div className="header">
      <h1>Weather.me.Weather</h1>
      <button onClick={changeTemp}
      value={props.degree}>Change to {getMarker(props.degree)}</button>
    </div>
  );
}

function WeatherDisplay(props) {
  const weather = props.main;
  const marker = props.degree;
  return (
    <div className="weatherDisplay">
      <h2>Weather for {weather.location}</h2>
      <p>Current temperature: {weather.temp} °{marker}</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Today's high: {weather.tempMax} °{marker}</p>
      <p>Today's low: {weather.tempMin} °{marker}</p>
      <p>Real feel: {weather.feelsLike} °{marker}</p>
      <p>Sky conditions: {weather.sky}</p>
      
    </div>
  );
}

export { Header, WeatherDisplay }