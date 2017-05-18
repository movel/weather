import React, { Component } from 'react';
// import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
import "bootswatch/spacelab/bootstrap.css";
import './App.css';
import WeatherDisplay from './WeatherDisplay';
// import LocalWeather from './LocalWeather';

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" },
  { name: "Beverly Hills", zip: "90209" }
];

class PlacesWeather extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 4,
    };
  }
  
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              React Simple Weather App
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} name={PLACES[activePlace].name} />
            </Col>
          </Row>
          
        </Grid>
      </div>
    );
  }
}

export default PlacesWeather;
