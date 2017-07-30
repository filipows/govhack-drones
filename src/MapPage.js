import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {Map, Marker, Popup, TileLayer, CircleMarker} from 'react-leaflet';
import googleMapsClient from '@google/maps'

var locations = [
    'Albany',
    'Australind',
    'Bunbury',
    'Carnavon',
    'Cervantes',
    'Dutch Inn',
    'Esperance',
    'Geraldton',
    'Gnarraloo',
    'Jurian Bay',
    'Kalbarri',
    'Lancelin',
    'Leeman',
    'Leighton',
    'Lucky Bay',
    'Mandurah',
    'Margaret River',
    'Monkey Mia',
    'Pelican Point',
    'Perth',
    'Safety Bay',
    'Snag Island',
    'Walpole',
]


function format_rgb(rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}


var desired_wind_speed = 22.5;
var factor = v => parseInt(v / desired_wind_speed * 255)

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
            data: null
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
            return <span>Loaded {this.state.locations.length} of {locations.length}</span>
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

                var current_wind_speed = parseInt(forecasts[0].value);

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

        return <Map center={position} zoom={13}>
            <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'>
            </TileLayer>
            {markers}
        </Map>
    }
}

export default MapPage;
