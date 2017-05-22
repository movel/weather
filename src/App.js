import React, { Component } from 'react';
import { Grid, Row, Col, Navbar } from "react-bootstrap";
import "bootswatch/cerulean/bootstrap.css";
import './App.css';
import LocalWeather from './LocalWeather';
import HighChartsPlot from './HighChartsPlot';
import Background from './img/SUN-min-min.jpeg';

class App extends Component {
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
    // const activePlace = this.state.activePlace;
    const localIP = this.state.localIP;
    if (!localIP) return <div>Loading data...</div>;
    
    let style = {
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover'
    }
    
    let styleChart = {
      opacity: '0.8'
    }
    
    return (
      <div style={style}>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Weather and Forecast</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col>
              <LocalWeather city_name={localIP.city} country_code={localIP.country} />
            </Col>
          </Row>
          
          <Row style={styleChart}>
            <HighChartsPlot city_name={localIP.city} country_code={localIP.country} />
          </Row>
          
          <Row>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </Row>
          
        </Grid>
      </div>
    );
  }
}

export default App;
