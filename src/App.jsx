import './App.css';
import { useEffect } from 'react';
import { getCoordinates } from './services/getCoordinates';
import { getCurrentWeather } from './services/getCurrentWeather';
import { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { kelvinToCelcius } from "./utils/kelvinToCelcius";
import { kelvinToFahrenheit } from "./utils/kelvinToFahrenheit";

function App() {
  // ESTADOS
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: '' });
  const API_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const KEY = '3326efd8c73a341091514d936390e545';
  

  // FUNCIONES
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({ error: false, message: '' });
    try {
      if (!city.trim()) throw { message: 'Campo ciudad es obligatorio' };
      const response = await axios.get(`${API_WEATHER}${city}&appid=${KEY}`);
      if (response.data.error) throw { message: 'Ciudad no encontrada' };
      setWeather({
        city: response.data.name,
        country: response.data.sys.country,
        temperature: {
          kelvin: response.data.main.temp,
          celsius: parseFloat(kelvinToCelcius(response.data.main.temp)),
          fahrenheit: parseFloat(kelvinToFahrenheit(response.data.main.temp)),
      },
        weather: {
          main: response.data.weather[0].main,
          description: response.data.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
        },
      });
    } catch (error) {
      setError({ error: true, message: 'Ciudad no existe' });
    } finally {
      setLoading(false);
    }
  };
  // USE EFFECT
  useEffect(() => {
    const loadWeather = async () => {
      const coordinates = await getCoordinates();
      if (coordinates) {
        const weatherData = await getCurrentWeather(
          coordinates.latitude,
          coordinates.longitude
        );
        setWeather(weatherData);
      }
    };
    loadWeather();
  }, []); 
  
  return (
  <Container maxWidth="xs" sx={{ mt: 2 }}>
    <h1 className='header'>Weather App</h1>
    <Box
      sx={{ display: 'grid', gap: 2 }}
      component="form"
      autoComplete="off"
      onSubmit={onSubmit}
    >
  <input 
  type="text"
  id="city"
  placeholder="Ingrese su Ciudad"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  className={error.error ? 'error' : ''}
  style={{
    border: error.error ? '1px solid red' : 'none',
    borderRadius: '35px',
    padding: '10px',
    fontSize: '16px',
    color: '#333',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.1)',
    outline: 'none'
  }}
/>
{error.error && <span className="error-message">{error.message}</span>}


      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        loading={loading}
        loadingIndicator="Buscando Ciudad..."
        style={{
          borderRadius: '35px',
          padding: '1px 2px',
          fontSize: '14px',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.3s ease',
          width: "180px", height: "40px",
          margin: "0 auto",
          fontFamily: 'caption',
        }}
      >
        Buscar
      </LoadingButton>
      
    </Box>
    <br /><br />
    <div className='div-clima'>
    {weather ? (
      <Box sx={{ mt: 2, display: 'grid', gap: 2, textAlign: 'center' }}>
        <Typography variant="h4" component="h2">
          {weather.city}, {weather.country}
        </Typography>
        <Box
          component="img"
          alt={weather.weather.description}
          src={weather.weather.icon}
          sx={{ margin: '0 auto' }}
        />
        <Typography variant="h6" component="h4">
          {weather.weather.main}
        </Typography>
        <Typography variant="h5" component="p">
        {isCelsius
          ? weather.temperature.celsius.toFixed(1)
        :weather.temperature.fahrenheit.toFixed(1)}{""}
          °{isCelsius ? 'C' : 'F'}
        </Typography>
        
        <button onClick={() => setIsCelsius(!isCelsius)}className="changeButton">
          Change °{isCelsius ? 'F' : 'C'}
        </button>
      </Box>
    ) : (
      <Typography variant="h6" component="p" sx={{ mt: 2 }}>
        Loading weather...
      </Typography>
    )}
    </div>
  </Container>
); 
}

export default App;
