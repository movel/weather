import React, { Component } from 'react';
import WeatherDisplay from './WeatherDisplay';

class LocalWeather extends Component {
  render() {
    return (
      <div>
        <WeatherDisplay name={this.props.city} country={this.props.country} />
      </div>
    );
  }
}

export default LocalWeather;