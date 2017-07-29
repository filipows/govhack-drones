import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BOM from './bom'

class App extends Component {
  constructor() {
    super();
    this.bom = new BOM('rxsaxWDy3Z3fM7asszHS72HM1v1Pb3zi7jrVIGvG');

    this.state = {
      val: null
    }
  }

  render() {
    var content = null;

    if (!this.state.loc) {
      navigator.geolocation.getCurrentPosition(loc => {
        this.setState({loc: {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        }})
      })

      content = <div>Waiting for location</div>

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

      content = <div>Loading data</div>;
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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {content}
        </p>
      </div>
    );
  }
}

export default App;
