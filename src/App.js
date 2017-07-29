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
import BOM from './bom'

class App extends Component {
  constructor() {
    super();

    this.state = {
      drawerOpen: false,
      bom: new BOM('rxsaxWDy3Z3fM7asszHS72HM1v1Pb3zi7jrVIGvG')
    }
  }

  handleToggleDrawer = () => this.setState({drawerOpen: !this.state.drawerOpen});
  handleClose = () => this.setState({drawerOpen: false});

  map() {
    return <div></div>
  }
  render() {

    return (
        <BrowserRouter>
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
              <Link to='/'><MenuItem onTouchTap={this.handleClose}>Home</MenuItem></Link>
              <Link to='/map'><MenuItem onTouchTap={this.handleClose}>Map</MenuItem></Link>
              <Link to='/about'><MenuItem onTouchTap={this.handleClose}>About</MenuItem></Link>
            </Drawer>
          </div> 
        </BrowserRouter>
    );
  }
}

export default App;
