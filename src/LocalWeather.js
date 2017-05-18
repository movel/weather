import React, { Component } from 'react';
import WeatherDisplay from './WeatherDisplay';

class LocalWeather extends Component {
  constructor() {
    super();
    this.state = {
      localIP: null,
    };
  }
  
  componentDidMount() {
    fetch("http://ipinfo.io/json", {method: "GET"})
      .then(res => res.json())
      .then(json => {this.setState({ localIP: json })});
  }
  
  render() {
    const localIP = this.state.localIP;
    if (!localIP) return <div>Loading data...</div>;
    
    return (
      <div>
        <WeatherDisplay name={localIP.city} country={localIP.country} />
      </div>
    );
  }
}

export default LocalWeather;