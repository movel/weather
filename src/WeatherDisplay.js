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
    // const name = "Honolulu";
    const country = this.props.country;
    // const country = "US";
    //console.log(name+", "+country);
    const URL = "http://api.openweathermap.org/data/2.5/weather?q="
                + name 
                + "," 
                + country
                + "&appid=ea60d6923551d551e93f9a69210c0440"
                + "&units=metric";
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
    //console.log(weatherData);
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <div>
          <h1>
            {weather.main} in {weatherData.name}, {this.props.country}
            <img src={iconUrl} alt={weatherData.description} style={{width: '10%', heigth: 'auto'}} />
          </h1>
          
          <p>Current: {weatherData.main.temp} °C</p>
          <p>Pressure: {(weatherData.main.pressure*0.750061683).toPrecision(5)} mmHg</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Wind Speed: {weatherData.wind.speed} m/hr</p>
        </div>
      </div>
    );
  }
}

export default WeatherDisplay;
