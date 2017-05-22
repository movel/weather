import React, { Component } from 'react';
import WeatherDisplay from './WeatherDisplay';

class LocalWeather extends Component {
  constructor() {
    super();
    this.state = {
      localIP: null,
    };
  }
  
  render() {
    return (
      <div>
        <WeatherDisplay name={this.props.city_name} country={this.props.country_code} />
      </div>
    );
  }
}

export default LocalWeather;