import React, { Component } from 'react';
import logo from './logo.svg';
import BOM from './bom'
import { RaisedButton, CircularProgress, Paper } from 'material-ui';

import { WeatherTableData } from './components/weather-table-data';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.bom = new BOM('rxsaxWDy3Z3fM7asszHS72HM1v1Pb3zi7jrVIGvG');

    this.state = {
      data: null,
      drawerOpen: false
    }
  }

  componentWillMount() {
    this.determine_location();
  }


  determine_location() {
    console.log('determining location');

    this.setState({
      location_requested: true
    })
    navigator.geolocation.getCurrentPosition(loc => {
      console.log('location: ', loc);
      this.setState({
        loc: {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        }
      })
    });
  }

  getThreeHourlyForecast(type, location) {
    return this.bom
      .forecasts()
      .grid()
      .interval('three-hourly')
      .get(type, location);
  }


  render() {
    var content = null;

    if (!this.state.location_requested) {
      content = (
        <RaisedButton onClick={this.determine_location.bind(this)} label="Determine location" />
      )

    } else if (!this.state.loc) {
      content = <span>Waiting for location</span>

    } else if (this.state.loc && !this.state.data) {
      console.log('determined location');

      Promise.all([
        this.getThreeHourlyForecast('wind', this.state.loc),
        this.getThreeHourlyForecast('temperatures', this.state.loc),
        this.getThreeHourlyForecast('precipitation', this.state.loc),
        this.getThreeHourlyForecast('icons', this.state.loc)
      ]).then(values => {
        console.log(values);
        this.setState({
          data: {
            // merge data
            wind: values[0],
            temp: values[1],
            rain: values[2],
            icons: values[3]
          }
        });
      }).catch((err) => {
        console.error('Error occured while fetching data', err);
      });

      content =
        <div>
          <p>Loading data</p>
          <CircularProgress size={80} thickness={5} />
        </div>
    } else {
      content = (
        <Paper className="Paper-main" zDepth={2}>
          <WeatherTableData data={this.state.data}/>
        </Paper>
      )
    }


    return (
      <div className="Home">
        <div className="Home-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Realtime Wind Forecast Data</h2>
        </div>
        <p>
          {content}
        </p>
      </div>
    );
  }
}

export default Home;
