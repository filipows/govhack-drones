import React, { Component } from 'react';
import logo from './logo.svg';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      location: null,
      drawerOpen: false
    }
  }

  render() {
    var content = null;

    if (this.state.location) {
      content = <span>All good</span>
    } else {
      content = <span>Waiting for location</span>
    }


    return (
         <div className="Home">
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

export default Home;
