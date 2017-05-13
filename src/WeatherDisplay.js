import React, { Component } from 'react';

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
    };
  }
  
  componentDidMount() {
    const name = this.props.name;
    console.log(name);
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      name +
      "&appid=ea60d6923551d551e93f9a69210c0440&units=metric";
    fetch(URL)
      .then(res => res.json())
      .then(json => {
        this.setState({ weatherData: json });
      });
  
  }
  
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading data...</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <div>
          <h1>
            {weather.main} in {weatherData.name}
            <img src={iconUrl} alt={weatherData.description} style={{width: '15%', heigth: 'auto'}} />
          </h1>
          <p>Current: {weatherData.main.temp}°C</p>
          <p>High: {weatherData.main.temp_max}°C</p>
          <p>Low: {weatherData.main.temp_min}°C</p>
          <p>Wind Speed: {weatherData.wind.speed} m/hr</p>
        </div>
      </div>
    );
  }
}

export default WeatherDisplay;
