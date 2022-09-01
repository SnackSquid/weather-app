

function Header() {
  return (
    <div className="header">
      <h1>Weather.me.Weather</h1>
    </div>
  );
}

function WeatherDisplay(props) {
  const weather = props.main;
  return (
    <div className="weatherDisplay">
      <p>Temp: {weather.temp}</p>
      <p>High: {weather.tempMax}</p>
      <p>Low: {weather.tempMin}</p>
      <p>Location: {weather.location}</p>
    </div>
  );
}

export { Header, WeatherDisplay }