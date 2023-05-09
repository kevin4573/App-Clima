
import './App.css'
import { useEffect } from 'react'
import { getCoordinates } from './services/getCoordinates'
import { getCurrentWeather } from './services/getCurrentWeather'
import { useState } from 'react'
function App() {
  const [weather, setWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  useEffect(()=>{
    const loadWeather = async () => {
      const coordinates = await getCoordinates();
      if (coordinates){
        const weatherData = await getCurrentWeather(
          coordinates.latitude,
           coordinates.longitude
           );
        setWeather(weatherData);

      }
    };
    loadWeather();
  },[])

  return (
    <>
      <h1>Wather App</h1>
      {weather ? (
        <>
      <article>
        <h2>{weather.weather.main}</h2>
        <p>{weather.weather.description}</p>
        <p>
          {isCelsius
          ? weather.temperature.celsius.toFixed(2)
        :weather.temperature.fahrenheit.toFixed(2)}{""}
          °{isCelsius ? 'C' : 'F'}
        </p>

        <div>
          <img src={weather.weather.icon} 
                alt={weather.weather.description}
                />
        </div>

        <p>
          {weather.city}, {weather.country}
        </p>
      </article>
      <button onClick={() => setIsCelsius (!isCelsius)}>
        Change °{isCelsius ? 'C' : 'F'}
      </button>
      </>
      ):(
      <p>Loading weather...</p>
      )}
    </>
  );
}

export default App
