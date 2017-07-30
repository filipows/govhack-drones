import React, { Component } from 'react';
import './weather-table-data.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const COLUMNS = 6;
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export class WeatherTableData extends Component {
  constructor(props) {
    super(props);
    console.log('received', props.data);
  }

  getDisplayDay(time) {
    const date = new Date(time);
    const month = date.getMonth();
    const dayOfMonth = date.getDate();
    return `${dayOfMonth}.${MONTH_NAMES[month]}`;
  }

  getDisplayTime(time) {
    const date = new Date(time);
    const hours = date.getHours();
    return `${hours}:00`;    
  }

  render() {
    return (
      <div className="Weather-table-data">
        <h3 style={{paddingTop: 20}}>Today</h3>
        <Table>
          <TableHeader 
            displaySelectAll={false}
            adjustForCheckbox={false}>
            <TableRow>
              <TableRowColumn>-</TableRowColumn>
               {this.props.data.windSpeedKnots.slice(0, COLUMNS).map( (data) => (
                <TableHeaderColumn key={data.time}>
                  { this.getDisplayDay(data.time) } <br />
                  { this.getDisplayTime(data.time) }
                </TableHeaderColumn>
              ))} 
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>Speed (knots)</TableRowColumn>
               {this.props.data.windSpeedKnots.slice(0, COLUMNS).map( (data) => (
                <TableHeaderColumn key={data.time}>
                  { data.value }
                </TableHeaderColumn>
              ))} 
            </TableRow>
            <TableRow>
              <TableRowColumn>Speed (kph)</TableRowColumn>
               {this.props.data.windSpeedKph.slice(0, COLUMNS).map( (data) => (
                <TableHeaderColumn key={data.time}>
                  { data.value }
                </TableHeaderColumn>
              ))} 
            </TableRow>
            <TableRow>
              <TableRowColumn>Direction</TableRowColumn>
               {this.props.data.windDirection.slice(0, COLUMNS).map( (data) => (
                <TableHeaderColumn key={data.time}>
                  { data.value }
                </TableHeaderColumn>
              ))} 
            </TableRow>
            <TableRow>
              <TableRowColumn>Icon</TableRowColumn>
               {this.props.data.icons.slice(0, COLUMNS).map( (data) => (
                <TableHeaderColumn key={data.time}>
                  { data.value }
                </TableHeaderColumn>
              ))} 
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}


// PropTypes