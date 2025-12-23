import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./SearchBox.css";
import { useState, useEffect } from 'react';

export default function SearchBox({ updateInfo }) {

    let [city, setCity] = useState("");
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);
    let [locationLoading, setLocationLoading] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "1055f619db3dc8c013f2f6520d193674";

    let getWeatherInfo = async (cityName) => {
        try {
            let response = await fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`)
            let jsonResponse = await response.json();

            // Get forecast data
            let forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`)
            let forecastJson = await forecastResponse.json();

            let result = {
                city: jsonResponse.name || cityName,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelslike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
                windSpeed: jsonResponse.wind?.speed || 0,
                pressure: jsonResponse.main.pressure,
                visibility: jsonResponse.visibility,
                sunrise: new Date(jsonResponse.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(jsonResponse.sys.sunset * 1000).toLocaleTimeString(),
                forecast: forecastJson.list.slice(0, 5).map(item => ({
                    date: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
                    temp: Math.round(item.main.temp),
                    weather: item.weather[0].description,
                    icon: item.weather[0].icon
                }))
            };
            console.log(result)
            return result;
        } catch (err) {
            throw err;
        }
    };

    let getWeatherByLocation = async (lat, lon) => {
        try {
            let response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            let jsonResponse = await response.json();

            // Get forecast data for location
            let forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            let forecastJson = await forecastResponse.json();

            let result = {
                city: jsonResponse.name || 'Your Location',
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelslike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
                windSpeed: jsonResponse.wind?.speed || 0,
                pressure: jsonResponse.main.pressure,
                visibility: jsonResponse.visibility,
                sunrise: new Date(jsonResponse.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(jsonResponse.sys.sunset * 1000).toLocaleTimeString(),
                forecast: forecastJson.list.slice(0, 5).map(item => ({
                    date: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
                    temp: Math.round(item.main.temp),
                    weather: item.weather[0].description,
                    icon: item.weather[0].icon
                }))
            };
            return result;
        } catch (err) {
            throw err;
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!city.trim()) {
            setError("Please enter a city name");
            return;
        }
        
        setLoading(true);
        setError("");
        
        try {
            let newInfo = await getWeatherInfo(city);
            setCity("");
            updateInfo(newInfo);
        } catch (err) {
            setError("City not found. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    let handleLocationClick = async () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }
        
        setLocationLoading(true);
        setError("");
        
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            
            const { latitude, longitude } = position.coords;
            let newInfo = await getWeatherByLocation(latitude, longitude);
            updateInfo(newInfo);
        } catch (err) {
            setError("Unable to get your location. Please enable location access.");
        } finally {
            setLocationLoading(false);
        }
    };

    return (<div className='Box'>
            <form onSubmit={handleSubmit}>
        <TextField 
            id="city"
            label="City name"
            variant="outlined"
            required
            value={city}
            onChange={handleChange}
            disabled={loading || locationLoading}
            fullWidth
            sx={{ mb: 2 }}
        />

        <div className="button-group">
            <Button
                type='submit'
                variant="contained"
                disabled={loading || locationLoading}
                sx={{ mb: 2, flex: 1 }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
            </Button>
            
            <IconButton
                onClick={handleLocationClick}
                disabled={loading || locationLoading}
                color="primary"
                sx={{ mb: 2, ml: 1 }}
                title="Get weather for your current location"
            >
                {locationLoading ? <CircularProgress size={24} color="inherit" /> : <LocationOnIcon />}
            </IconButton>
        </div>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
    </form>
    </div>
    );
}