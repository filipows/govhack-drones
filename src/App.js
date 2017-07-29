import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';


import AppBar from 'material-ui/AppBar';
import './App.css';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Home from './Home';
import About from './About';

class App extends Component {
  constructor() {
    super();

    this.state = {
      drawerOpen: false
    }
  }

  handleToggleDrawer = () => this.setState({drawerOpen: !this.state.drawerOpen});
  handleClose = () => this.setState({drawerOpen: false});

  render() {

    return (
        <BrowserRouter>
          <div className="App">
            <AppBar title="Wind Buddy" onLeftIconButtonTouchTap={this.handleToggleDrawer}/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/about' component={About}/>
            </Switch>
            <Drawer 
              docked={false}
              open={this.state.drawerOpen}
              width={200}
              onRequestChange={ (open) => this.setState({drawerOpen: open}) }
            >

              <Link to="/" style={{ textDecoration: 'none' }}>
                <MenuItem onTouchTap={this.handleClose}>Home</MenuItem>
              </Link>
              <Link to="/map" style={{ textDecoration: 'none' }}>
                <MenuItem onTouchTap={this.handleClose}>Map</MenuItem>
              </Link>
              <Link to="/about" style={{ textDecoration: 'none' }}>
                <MenuItem onTouchTap={this.handleClose}>About</MenuItem>
              </Link>


            </Drawer>
          </div> 
        </BrowserRouter>

    );
  }
}

export default App;
