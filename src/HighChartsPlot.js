import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts/ReactHighcharts';
var Highcharts = require('highcharts');
//import HighCharts from 'highcharts';
import 'bootswatch/spacelab/bootstrap.css';
import './App.css';
// import LocalWeather from './LocalWeather';
// import PlacesWeather from './PlacesWeather';

class HighChartsPlot extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
    };
  }
  
  componentDidMount() {
    const city_name = 'Alchevsk';
    const country_code = 'ua';
    const URL = "http://api.openweathermap.org/data/2.5/forecast?q=" 
                + city_name 
                + "," 
                + country_code 
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
    const list = weatherData.list;
    console.log(list);
    let data_temp = [];
    let data_press = [];
    let xAxis = [];
    for (let i in list) {
      data_temp.push(list[i].main.temp);
      data_press.push(list[i].main.pressure);
      console.log(list[i].dt_txt);
      xAxis.push(new Date(list[i].dt_txt));
      if(i > 12) break;
    }
    const config = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Weather and forecasts'
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      legend: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        categories: xAxis,
        title: {
          text: 'Date'
        },
        labels: {
          overflow: 'justify',
          format: '{value:%m/%d %H}',
        }
      },
      yAxis: {
          title: {
              text: 'Temperature, °C'
          },
          labels: {
              formatter: function () {
                  return this.value + '°';
              }
          }
      },
      series: [{
        type: 'area',
        name: 'temperature',
        data: data_temp
      }]
    };
    return (
      <div>
        <ReactHighcharts config={config} ref="chart"></ReactHighcharts>
        
      </div>
    );
  }
}

export default HighChartsPlot;



