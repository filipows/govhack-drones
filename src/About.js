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
              <li>...</li>
              <li>...</li>
              <li>...</li>
              <li>...</li>
            </ul>
             
        </div> 
    );
  }
}

export default About;
