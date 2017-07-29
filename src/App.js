import React, { Component } from 'react';
import {
  HashRouter,
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

  map() {
    return <div></div>
  }
  render() {

    return (
        <HashRouter>
          <div className="App">
            <AppBar title="Wind Buddy" onLeftIconButtonTouchTap={this.handleToggleDrawer}/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/map' component={this.map.bind(this)}></Route>
              <Route path='/about' component={About}/>
            </Switch>
            <Drawer 
              docked={false}
              open={this.state.drawerOpen}
              width={200}
              onRequestChange={ (open) => this.setState({drawerOpen: open}) }
            >
              <MenuItem onTouchTap={this.handleClose}><Link to='/'>Home</Link></MenuItem>
              <MenuItem onTouchTap={this.handleClose}><Link to='/map'>Map</Link></MenuItem>
              <MenuItem onTouchTap={this.handleClose}><Link to='/about'>About</Link></MenuItem>
            </Drawer>
          </div> 
        </HashRouter>

    );
  }
}

export default App;
