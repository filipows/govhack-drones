import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import logo from './logo.svg';
import './App.css';
import BOM from './bom'

injectTapEventPlugin();

class App extends Component {
  constructor() {
    super();
    this.bom = new BOM('rxsaxWDy3Z3fM7asszHS72HM1v1Pb3zi7jrVIGvG');

    this.state = {
      val: null
    }
  }

  determine_location() {
    this.setState({
      location_requested: true
    })
    navigator.geolocation.getCurrentPosition(loc => {
      this.setState({loc: {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      }})
    });
  }

  render() {
    var content = null;

    if (!this.state.location_requested) {
      content = (
        <button onClick={this.determine_location.bind(this)}>
          Determine location
        </button>
      )

    } else if (!this.state.loc) {
      content = <span>Waiting for location</span>

    } else if (this.state.loc && !this.state.val) {
      this.bom
      .forecasts()
      .grid()
      .interval('three-hourly')
      .get(
        'wind',
        this.state.loc
      )
      .then(data => this.setState({val: data}));

      content = <span>Loading data</span>;
    } else {
      content = (
        <span>
          {JSON.stringify(this.state.val)}
          To get started, edit <code>src/App.js</code> and save to reload.
          {JSON.stringify(this.state.location)}
        </span>
      )
    }

    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            {content}
          </p>
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
