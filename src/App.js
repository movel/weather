import React, { Component } from 'react';
// import "bootstrap/dist/css/bootstrap.css";
import { Grid, Row, Col } from "react-bootstrap";
import "bootswatch/spacelab/bootstrap.css";
import './App.css';
import LocalWeather from './LocalWeather';
import HighChartsPlot from './HighChartsPlot';
// import PlacesWeather from './PlacesWeather';

class App extends Component {
  
  
  render() {
    // const activePlace = this.state.activePlace;
    return (
      <div>
        
        <Grid>
          <Row>
            <Col>
              <LocalWeather />
            </Col>
          </Row>
          
          <Row>
            <HighChartsPlot />
          </Row>
          
        </Grid>
      </div>
    );
  }
}

export default App;
