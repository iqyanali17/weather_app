    Weather App by Ashyan
A beautiful, modern weather application built with React, Vite, and Material-UI featuring stunning gradients, responsive design, and comprehensive weather information.


Features
1.Real-time Weather Data: Fetches current weather conditions from OpenWeatherMap API
3.2.5-Day Forecast: Extended weather predictions with daily forecasts
4.Beautiful UI: Stunning animated rainbow gradient h1 title with modern design
5.Responsive Layout: Optimized for desktop, tablet, and mobile devices
6.Unit Conversion: Toggle between Celsius and Fahrenheit
7.Dark/Light Theme: Switch between light and dark modes
8.Search History: Recent city searches with quick access
9.Geolocation Support: Automatic weather detection for user's location
10.Weather Animations: Smooth transitions and hover effects
11.Large Weather Display: Impressive 2000px weather card for better visibility


Tech Stack
React 18 - Modern React with hooks
Vite - Fast build tool and development server
Material-UI (MUI) - Premium React component library
OpenWeatherMap API - Real-time weather data
CSS3 - Advanced styling with gradients and animations
LocalStorage - Persistent user preferences


Installation 
Clone the repository:
bash
git clone https://github.com/iqyanali17/weather_app.git
Navigate to the project directory:
bash
cd weather_app
Install dependencies:
bash
npm install
Start the development server:
bash
npm run dev
Open your browser and navigate to http://localhost:5173


Usage
Search for Weather
Enter a city name in the search box
Click "Search" or press Enter
View current weather conditions and 5-day forecast

Features
1.Temperature Units: Toggle between °C and °F using the switch
2.Theme Mode: Switch between light and dark themes
3.Recent Searches: Click on recent cities from the search history
4.Weather Icons: Dynamic icons based on weather conditions
5.Detailed Information: Wind speed, humidity, pressure, sunrise/sunset times


API Configuration
The app uses OpenWeatherMap API for weather data. To use your own API key:

Sign up at OpenWeatherMap
Get your free API key
Replace the API key in src/WeatherApp.jsx line 79
Project Structure
weather_app/