import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './infoBox.css';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AirIcon from '@mui/icons-material/Air';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SpeedIcon from '@mui/icons-material/Speed';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';

export default function InfoBox({ info }) {

  let INIT_URL = "https://images.unsplash.com/photo-1720803055506-4342f9eafd6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fG5vcm1hbCUyMHdlYXRoZXIlMjBJTkRJQXxlbnwwfHwwfHx8MA%3D%3D";
  let HOT_URL = "https://media.istockphoto.com/id/2207221335/photo/sunlit-palm-trees-against-a-blue-sky.webp?a=1&b=1&s=612x612&w=0&k=20&c=ownoIy68-de20ac3hs_3ntkwVHQKOMv7bBcujozN0A8=";
  let RAIN_URL = "https://media.istockphoto.com/id/498063665/photo/rainy-landscape.jpg?s=1024x1024&w=is&k=20&c=JmmkAKBNVz2QC2YaXGl8lLvYQYrn6SYXt_FPtN-8JUc=";
  let COLD_URL = "https://plus.unsplash.com/premium_photo-1669727758969-d6a7ecda8011?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q09MRCUyMHdlYXRoZXIlMjBJTkRJQXxlbnwwfHwwfHx8MA%3D%3D";

  const getWeatherIcon = (weather) => {
    const weatherLower = weather.toLowerCase();
    if (weatherLower.includes('rain') || weatherLower.includes('drizzle')) {
      return <OpacityIcon className="forecast-weather-icon rain" />;
    } else if (weatherLower.includes('cloud')) {
      return <CloudIcon className="forecast-weather-icon cloud" />;
    } else if (weatherLower.includes('snow')) {
      return <AcUnitIcon className="forecast-weather-icon snow" />;
    } else if (weatherLower.includes('clear') || weatherLower.includes('sun')) {
      return <SunnyIcon className="forecast-weather-icon sun" />;
    } else if (weatherLower.includes('thunder') || weatherLower.includes('storm')) {
      return <ThunderstormIcon className="forecast-weather-icon storm" />;
    } else {
      return <CloudIcon className="forecast-weather-icon default" />;
    }
  };

  return (
    <div className="InfoBox">

      <div className='box-container'>
        <Card sx={{ maxWidth: 2000, width: '100%' }}>
          <CardMedia
            sx={{ height: 140 }}
            image={info.originalHumidity > 80
              ? RAIN_URL
              : info.originalTemp > 15
                ? HOT_URL
                : COLD_URL}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" className="city-name"> 
              {info.city}
              {
                info.originalHumidity > 80
                  ? <ThunderstormIcon className="weather-icon" />
                  : info.originalTemp > 15
                    ? <SunnyIcon className="weather-icon" />
                    : <AcUnitIcon className="weather-icon" />
              }
            </Typography>
            
            <Typography variant="h3" className="temperature">
              {Math.round(info.temp)}{info.unitSymbol || '°C'}
            </Typography>
            
            <Typography variant="body1" className="weather-description">
              {info.weather.charAt(0).toUpperCase() + info.weather.slice(1)}
            </Typography>
            
            <Typography variant="body2" sx={{ color: 'text.secondary' }} className="weather-details" component="div">
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Feels like:</span>
                  <span className="detail-value">{Math.round(info.feelslike)}{info.unitSymbol || '°C'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Humidity:</span>
                  <span className="detail-value">{info.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Min/Max:</span>
                  <span className="detail-value">{Math.round(info.tempMin)}{info.unitSymbol || '°C'}/{Math.round(info.tempMax)}{info.unitSymbol || '°C'}</span>
                </div>
                {info.windSpeed && (
                  <div className="detail-item">
                    <AirIcon className="detail-icon" />
                    <span className="detail-value">{info.windSpeed} m/s</span>
                  </div>
                )}
                {info.pressure && (
                  <div className="detail-item">
                    <SpeedIcon className="detail-icon" />
                    <span className="detail-value">{info.pressure} hPa</span>
                  </div>
                )}
                {info.sunrise && (
                  <div className="detail-item">
                    <WbSunnyIcon className="detail-icon" />
                    <span className="detail-value">{info.sunrise}</span>
                  </div>
                )}
                {info.sunset && (
                  <div className="detail-item">
                    <NightlightIcon className="detail-icon" />
                    <span className="detail-value">{info.sunset}</span>
                  </div>
                )}
              </div>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
          {info.forecast && (
            <CardContent className="forecast-section">
              <Typography variant="h6" className="forecast-title">
                5-Day Forecast
              </Typography>
              <div className="forecast-grid">
                {info.forecast.map((day, index) => (
                  <div key={index} className="forecast-item">
                    <Typography variant="body2" className="forecast-date">
                      {day.date}
                    </Typography>
                    <div className="forecast-icon">
                      {getWeatherIcon(day.weather)}
                    </div>
                    <Typography variant="body2" className="forecast-temp">
                      {day.temp}{info.unitSymbol || '°C'}
                    </Typography>
                    <Typography variant="caption" className="forecast-desc">
                      {day.weather.split(' ')[0]}
                    </Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}