import logo from './logo.svg';
import './App.css';

function App() {
  const [weater, updateWeather] = useState({
    temp: 0,
    tempMax: 0,
    tempMin: 0,
    feelsLike: 0,
    location: '',
  });

  const setWeather = (props) => {

  }

  return (
    <div>
      <p></p>
    </div>
  );
}

async function getWeather() {
  const cityName = 'Chicago';
  const apiKey = '3a0e7e455c0a21e0b314e046ad8e27d0';
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
  const response = await fetch(api, {mode: 'cors'});
  const weather = await response.json();
  console.log(weather)
}

getWeather();

export default App;
