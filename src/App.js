import React, { Component } from 'react';
import Fetch from 'react-fetch';
import "bootswatch/cerulean/bootstrap.css";
import { Grid, Row, Col, Navbar } from "react-bootstrap";
import './App.css';
import LocalWeather from './LocalWeather';
import HighChartsPlot from './HighChartsPlot';
import TestComponent from './TestComponent';
import Background from './img/SUN-min-min.jpeg';

class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        localIP: null,
        city: '',
        country: '',
        text: ''
    };
  }
  
  getInitialState() {
    return {
      text: '',
      value: ''
    };
  }
  
  componentWillMount() {
    fetch("http://ipinfo.io/json", {method: "GET"})
      .then(res => res.json())
      .then(json => {this.setState({ localIP: json })});
  }
  
  componentDidMount() {
    const localIP = this.state.localIP;
    
    if (!localIP) return console.log(this.state.localIP);
    this.setState({ city: localIP.city });
    this.setState({ country: localIP.country });
    
    console.log(this.state.city);
  }
  
  handleChange(e) {
    this.setState({ text: e.target.value });
    // console.log(this.state.city);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    let local = {};
    local.city = this.state.newCity;
    local.country = '';
    this.setState({ localIP: local });
    this.setState({ text: '' });
  }
  
  // handleSubmit(e) {
  //   e.preventDefault();
  //   var newItem = {
  //     text: this.state.text,
  //     id: Date.now()
  //   };
  //   this.setState((prevState) => ({
  //     items: prevState.items.concat(newItem),
  //     text: ''
  //   }));
  // }
  
  onError(error){
    console.log(error);
  }
  
  render() {
    // const activePlace = this.state.activePlace;
    const localIP = this.state.localIP;
    if (!localIP) return <div>Loading data...</div>;
    
    console.log(this.state.city);
    
    let style = {
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover'
    };
    
    let styleChart = {
      opacity: '0.8'
    };
    
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
            <Col md={4} sm={4}>
              <LocalWeather city={localIP.city} country={localIP.country} />
            </Col>
            <Col md={8} sm={8} style={styleChart}>
              <HighChartsPlot city={localIP.city} country={localIP.country} />
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12}>
              <br />
                <form onSubmit={this.handleSubmit}>
                  <input 
                    onChange={this.handleChange} 
                    value={this.state.text} 
                  />
                  <button>New City</button>
                </form>
              <br />
              <Fetch url="http://httpbin.org/headers" onError={this.onError}>
                <TestComponent/>
              </Fetch>
            </Col>
          </Row>
          
          
        </Grid>
      </div>
    );
  }
}

export default App;
