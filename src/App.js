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
import {MenuItem} from 'material-ui';
import Home from './Home.jsx';
import About from './About';
import HolidayPlanner from './HolidayPlanner';
import BOM from './bom'
import MapPage from './MapPage'
import IconButton from 'material-ui/IconButton'
import NearMe from 'material-ui/svg-icons/maps/near-me'


function getCurrentPosition() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      drawerOpen: false,
      bom: new BOM('rxsaxWDy3Z3fM7asszHS72HM1v1Pb3zi7jrVIGvG'),
      location: null
    }
  }

  handleToggleDrawer = () => this.setState({drawerOpen: !this.state.drawerOpen});
  handleClose = () => this.setState({drawerOpen: false});

  handleRight() {
    return getCurrentPosition().then(
      loc => {
        this.setState({location: {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        }})
      }
    )
  }

  map() {
    return <MapPage bom={this.state.bom}
                    location={this.state.location}
    />
  }

  home() {
    return <Home location={this.state.location}/>
  }

  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <AppBar title="Wind Buddy"
                    onLeftIconButtonTouchTap={this.handleToggleDrawer}
                    onRightIconButtonTouchTap={this.handleRight.bind(this)}
                    iconElementRight={<IconButton><NearMe/></IconButton>}
            />
            <Switch>
              <Route exact path='/' component={this.home.bind(this)}/>
              <Route exact path='/map' component={this.map.bind(this)}></Route>
              <Route exact path='/about' component={About}/>
              <Route path='/holiday-planner' component={HolidayPlanner}/>
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
                <MenuItem onTouchTap={this.handleClose}>Wind Map</MenuItem>
              </Link>
              <Link to="/holiday-planner" style={{ textDecoration: 'none' }}>
                <MenuItem onTouchTap={this.handleClose}>Plan your holidays</MenuItem>
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
