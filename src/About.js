import React, { Component } from 'react';

class About extends Component {
  constructor() {
    super();
  }
  render() {
    return (
         <div className="About">
             <h2>Wind Buddy was created during GovHack2017 by the folllowing folks:</h2>

            <ul style={ {listStyle: 'none'} }>
              <li>Chris Filipowski</li>
              <li>David SW Kong</li>
              <li>Dominic May</li>
              <li>Rebecca Lim</li>
            </ul>
             
        </div> 
    );
  }
}

export default About;
