import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {Map, Popup, TileLayer, CircleMarker} from 'react-leaflet';
import googleMapsClient from '@google/maps'
import { RaisedButton, CircularProgress } from 'material-ui';
import moment from 'moment';
import * as _ from 'lodash';

var locations = [
    'Albany, Western Australia',
    'Australind',
    'Bunbury',
    'Carnavon',
    'Cervantes, Western Australia',
    'Dutch Inn Beach, Cottesloe, Western Australia',
    'Esperance',
    'Geraldton',
    'Gnarraloo',
    'Jurian Bay',
    'Kalbarri',
    'Lancelin',
    'Leeman',
    'Leighton, Western Australia',
    'Lucky Bay',
    'Mandurah',
    'Margaret River',
    'Monkey Mia',
    'Pelican Point, Western Australia',
    'Perth',
    'Safety Bay',
    'Snag Island, Western Australia',
    'Walpole, Western Australia',
]


function format_rgb(rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}


var desired_wind_speed = 22.5;
var factor = v => parseInt(v / desired_wind_speed * 255, 10)

function colour_for_speed(speed) {
    var diff = Math.abs(desired_wind_speed - speed)

    return [
        factor(diff),
        255 - factor(diff),
        0
    ];
}


class MapPage extends Component {
    static propTypes = {
        bom: PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.initialProps = {
            location: null, // don't know location yet
            bom: null
        }
        this.state = {
            locations: [],
            gma: googleMapsClient.createClient({
                key: "AIzaSyDQNKJpjfLrBo4FbwSJLGQ2hrD-DhWAszI",
                Promise: Promise
            }),
            data: null,
            time_type: "Now"
        }

        this.locations_kicked = false;
    }

    getForLocation(location) {
        return (
            this.props.bom
            .forecasts()
            .grid()
            .interval('three-hourly')
            .get(
                'wind',
                location
            )
        )
    }

    render() {
        if (!this.props.location) {
            return <div>Click the button in the top right to get your location</div>
        }

        if (this.props.bom && !this.locations_kicked) {
            for (const location_name of locations) {
                this.state.gma.geocode({address: location_name})
                .asPromise()
                .then(
                    coded => {
                        var location = coded.json.results[0].geometry.location;
                        location = {
                            latitude: location.lat,
                            longitude: location.lng,
                        }
                        return (
                            this.getForLocation(location)
                            .then(
                                data => ({
                                    data: data,
                                    location: location,
                                    location_name: location_name
                                })
                            )
                        );
                    }
                )
                .then(
                    data => {
                        this.setState({
                            locations: this.state.locations.concat([data])
                        })
                    }
                )
            }
            this.locations_kicked = true;
        }

        if (this.state.locations.length < locations.length) {
            return (
                <div>
                  <p>Loaded {this.state.locations.length} of {locations.length}</p>
                  <CircularProgress size={80} thickness={5} />
                </div>
            )
        }

        var position = [
            this.props.location.latitude,
            this.props.location.longitude,
        ];

        var markers =
            this.state.locations
            .filter(data => data.data.code !== 'FORECAST-404A')
            .map(
            data => {
                var forecasts = data.data.data.attributes.wind_speed_kph.forecast_data;

                var current_wind_speed = parseInt(this.getForecast(forecasts).value, 10);

                var color = colour_for_speed(current_wind_speed)

                return (
                    <CircleMarker
                        center={[data.location.latitude, data.location.longitude]}
                        radius={5}
                        color={format_rgb(color)}
                    >
                        <Popup>
                            <span>
                                {current_wind_speed}km/h at {data.location_name}
                            </span>
                        </Popup>
                    </CircleMarker>
                )
            }
        );
        const style = {
            margin: 12,
        };

        return <div>
            <RaisedButton onClick={this.showForecast.bind(this)} label="Now" style={style}/>
            <RaisedButton onClick={this.showForecast.bind(this)} label="In one hour" style={style}/>
            <RaisedButton onClick={this.showForecast.bind(this)} label="In four hours" style={style}/>
            <Map center={position} zoom={5}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'>
                </TileLayer>
                {markers}
            </Map>
        </div>
    }

    showForecast(event) {
        this.setState({
            time_type: event.target.textContent
        })
    }
    getForecast(forecasts) {
        var now = moment();

        function closest_to(time) {
            return _.minBy(
                forecasts,
                forecast => moment(forecast.time).diff(time, 'minutes')
            )
        }

        switch(this.state.time_type) {
            case "Now":           return closest_to(now                );
            case "In one hour":   return closest_to(now.add({hours: 1}));
            case "In four hours": return closest_to(now.add({hours: 4}));
            default:
        }
    }
}

export default MapPage;
