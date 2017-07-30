import React, { Component } from 'react';
import logo from './logo.svg';
import BOM from './bom'
import { RaisedButton, CircularProgress, Paper } from 'material-ui';

import { WeatherTableData } from './components/weather-table-data';
import './Home.css';

import * as _ from 'lodash';

class Home extends Component {
  constructor(props) {
    super(props);
    this.bom = props.bom;

    this.state = {
      loc: props.location
    }
  }

  componentWillMount() {
    // this.determine_location();
  }

  componentWillReceiveProps(nextProps) {
    console.log('new props: ', nextProps);
    console.log('when receiving props', this.state);
    this.setState({
      loc: nextProps.location
    });

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

    console.log('location:', this.state.loc)
    console.log('state', this.state)

    if (!this.state.loc) {
      content = <p>Click the button in the top right to get your location</p>

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
            windSpeedKnots: values[0].data.attributes.wind_speed_knots.forecast_data,
            windSpeedKph: values[0].data.attributes.wind_speed_kph.forecast_data,
            windDirection: values[0].data.attributes.wind_direction.forecast_data,
            icons: values[3].data.attributes.icon_descriptor.forecast_data,
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
        <div>
          <div className="Home-header">
            <h2>Realtime Wind Forecast Data</h2>
          </div>
          <Paper className="Paper-main" zDepth={2}>
            <WeatherTableData data={this.state.data} />
          </Paper>
        </div>
      )
    }


    return (
      <div className="Home">
        <div>
          {content}
        </div>
      </div>
    );
  }
}

export default Home;
