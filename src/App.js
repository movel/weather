import React, { Component } from 'react';
// import "bootstrap/dist/css/bootstrap.css";
import { Grid, Row, Col, Navbar } from "react-bootstrap";
import "bootswatch/spacelab/bootstrap.css";
import './App.css';
import LocalWeather from './LocalWeather';
import HighChartsPlot from './HighChartsPlot';
// import PlacesWeather from './PlacesWeather';

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
    
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col>
              <LocalWeather city_name={localIP.city} country_code={localIP.country} />
            </Col>
          </Row>
          
          <Row>
            <HighChartsPlot city_name={localIP.city} country_code={localIP.country} />
          </Row>
          
        </Grid>
      </div>
    );
  }
}

export default App;
