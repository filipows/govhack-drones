import React, { Component } from 'react';
import {DatePicker} from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';

class HolidayPlanner extends Component {
  constructor() {
    super();
  }

  onStartDateChange = (event, date) => {
    console.log('start date:', date);
  }

  onEndDateChange = (event, date) => {
      console.log('end date:', date);
  }

  render() {
    return (
         <div className="HolidayPlanner">
           <h1>Find a best windy spot in the area you plan to go based on our historical data:</h1>
           <div>
            <DatePicker onChange={this.onStartDateChange} hintText="Start date"/>
           </div>
           <div>
            <DatePicker onChange={this.onEndDateChange} hintText="End date"/>
           </div>

          <RaisedButton label="Search best windy destination"></RaisedButton>
        </div> 
    );
  }
}

export default HolidayPlanner;
