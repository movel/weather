import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts/ReactHighcharts';
import Highcharts from 'highcharts/highcharts';
//import 'bootswatch/spacelab/bootstrap.css';
import './App.css';

class HighChartsPlot extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      city_name: '',
      country_code: ''
    };
  }
  
  componentDidMount() {
    const city_name = this.props.city_name;
    this.setState({ city_name: city_name });
    const country_code = this.props.country_code;
    this.setState({ country_code: country_code });
    const URL = "http://api.openweathermap.org/data/2.5/forecast?q=" 
                + city_name 
                + "," 
                + country_code 
                + "&appid=ea60d6923551d551e93f9a69210c0440"
                + "&units=metric"
                + "&cnt=12";
    
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
    
    let data_temp = [];
    let data_press = [];
    
    for (let i in list) {
      data_temp.push(list[i].main.temp);
      data_press.push(list[i].main.pressure);
    }
    
    let date = new Date(list[0].dt_txt);
    
    const config = {
      chart: {
        zoomType: 'xy'
      },
      title: {
          text: `Weather and Forecast Data for ${this.state.city_name}, ${this.state.country_code}`
      },
      subtitle: {
          text: 'Source: <a>http://openweathermap.org/</a>'
      },
      xAxis: [{
        title: {
          text: 'Date'
        },
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%e of %b'
        }
      }],
      
      yAxis: [{ // Primary yAxis
          labels: {
              format: '{value}°C',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          title: {
              text: 'Temperature',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          }
          
      }, { // Secondary yAxis
          gridLineWidth: 0,
          title: {
              text: 'Pressure',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          labels: {
              format: '{value} mb',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          opposite: true
      }],
      tooltip: {
          shared: true,
          backgroundColor: "rgba(200,247,247,0.85)"
      },
      plotOptions: {
        spline: {
          lineWidth: 4,
          states: {
              hover: {
                  lineWidth: 5
              }
          },
          marker: {
              enabled: true
          },
          pointInterval: 3*3600000, // three hour
          pointStart: Date.parse(date)
        }
      },
      series: [
        {
          name: 'Temperature',
          type: 'spline',
          data: data_temp,
          tooltip: {
              valueSuffix: ' °C'
          }
        },
        {
          name: 'Pressure',
          type: 'spline',
          yAxis: 1,
          data: data_press,
          marker: {
              enabled: false
          },
          dashStyle: 'shortdot',
          tooltip: {
              valueSuffix: ' mb'
          }
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



