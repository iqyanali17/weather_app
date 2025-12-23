import { useState, useEffect } from "react"
import InfoBox from "./infoBox"
import SearchBox from "./SearchBox"
import { Box, Container, Typography, Switch, FormControlLabel, IconButton, Tooltip, Button } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import './WeatherApp.css'

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        feelslike: 24.84,
        temp: 25.05,
        tempMin: 25.05,
        tempMax: 25.05,
        humidity: 47,
        weather: "haze",
        windSpeed: 3.5,
        pressure: 1013,
        visibility: 10000,
        sunrise: "06:30 AM",
        sunset: "06:45 PM",
        forecast: [
            { date: "Mon", temp: 26, weather: "sunny", icon: "01d" },
            { date: "Tue", temp: 24, weather: "cloudy", icon: "02d" },
            { date: "Wed", temp: 22, weather: "rainy", icon: "10d" },
            { date: "Thu", temp: 25, weather: "partly cloudy", icon: "03d" },
            { date: "Fri", temp: 27, weather: "sunny", icon: "01d" }
        ]
    })
    const [unit, setUnit] = useState('celsius');
    const [darkMode, setDarkMode] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    
    useEffect(() => {
        const savedHistory = localStorage.getItem('weatherSearchHistory');
        if (savedHistory) {
            setSearchHistory(JSON.parse(savedHistory));
        }
        const savedUnit = localStorage.getItem('weatherUnit');
        if (savedUnit) {
            setUnit(savedUnit);
        }
    }, []);
    
    const convertTemp = (temp, toUnit) => {
        if (toUnit === 'fahrenheit') {
            return Math.round((temp * 9/5) + 32);
        }
        return Math.round(temp);
    };
    
    const getUnitSymbol = () => {
        return unit === 'celsius' ? '°C' : '°F';
    };
    
    const updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
        
        // Update search history
        if (newInfo.city && !searchHistory.includes(newInfo.city)) {
            const newHistory = [newInfo.city, ...searchHistory.slice(0, 4)];
            setSearchHistory(newHistory);
            localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
        }
    };
    
    const handleUnitToggle = () => {
        const newUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
        setUnit(newUnit);
        localStorage.setItem('weatherUnit', newUnit);
    };
    
    const handleHistoryClick = async (city) => {
        // Fetch actual weather data for the historical city
        try {
            const API_URL = "https://api.openweathermap.org/data/2.5/weather";
            const API_KEY = "1055f619db3dc8c013f2f6520d193674";
            
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            
            // Get forecast data
            let forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
            let forecastJson = await forecastResponse.json();
            
            let result = {
                city: jsonResponse.name || city,
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
            
            updateInfo(result);
        } catch (err) {
            console.error('Error fetching weather for history item:', err);
            // If fetch fails, just update the city name as fallback
            updateInfo({ ...weatherInfo, city });
        }
    };
    return (
        <Box className={`weather-app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <Box className="header-controls">
                <Tooltip title="Toggle dark mode">
                    <IconButton onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Tooltip>
                
                <FormControlLabel
                    control={
                        <Switch
                            checked={unit === 'fahrenheit'}
                            onChange={handleUnitToggle}
                            color="primary"
                        />
                    }
                    label={unit === 'celsius' ? '°C' : '°F'}
                    className="unit-toggle"
                />
            </Box>
            
            <Container maxWidth="xl" className="weather-container">
                <Typography 
                    variant="h1" 
                    component="h1" 
                    className="top-title"
                    sx={{
                        fontWeight: '800',
                        fontSize: '4rem',
                        lineHeight: 1.1,
                        background: darkMode 
                            ? 'linear-gradient(135deg, #E91E63, #9C27B0, #673AB7, #3F51B5, #2196F3)'
                            : 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundSize: '200% 200%',
                        animation: 'gradientShift 4s ease infinite',
                        mb: 3,
                        mt: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'visible',
                        width: '100%',
                        textAlign: 'center',
                        paddingLeft: '0rem',
                        textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        letterSpacing: '0.5px'
                    }}
                >
                    Weather App by Ashyan
                </Typography>
                
                <Box className="main-layout">
                    <Box className="sidebar">
                        <Box className="search-section">
                            <SearchBox updateInfo={updateInfo} />
                        </Box>
                        
                        {searchHistory.length > 0 && (
                            <Box className="search-history">
                                <Typography variant="body2" className="history-title">
                                    Recent Searches:
                                </Typography>
                                <Box className="history-items">
                                    {searchHistory.map((city, index) => (
                                        <Button
                                            key={index}
                                            size="small"
                                            variant="outlined"
                                            onClick={() => handleHistoryClick(city)}
                                            className="history-item"
                                        >
                                            {city}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Box>
                    
                    <Box className="main-content">
                        <InfoBox info={{
                            ...weatherInfo,
                            temp: convertTemp(weatherInfo.temp, unit),
                            tempMin: convertTemp(weatherInfo.tempMin, unit),
                            tempMax: convertTemp(weatherInfo.tempMax, unit),
                            feelslike: convertTemp(weatherInfo.feelslike, unit),
                            unitSymbol: getUnitSymbol(),
                            forecast: weatherInfo.forecast?.map(day => ({
                                ...day,
                                temp: convertTemp(day.temp, unit)
                            })),
                            // Keep original Celsius values for image selection
                            originalTemp: weatherInfo.temp,
                            originalHumidity: weatherInfo.humidity
                        }} />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}