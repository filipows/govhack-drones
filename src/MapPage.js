import React, { Component } from 'react';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import HeatLayer from './HeatLayer';
import getMapsApi from 'google-maps-api'

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


class MapPage extends Component {
    constructor() {
        super();
        this.initialProps = {
            location: null, // don't know location yet
            bom: null
        }
        this.state = {
            locations: [],
            gma: null,
            data: null
        }

        debugger;
        getMapsApi("API_KEY")().then(
            gma => this.setState({gma: gma})
        )
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
        debugger;
        if (this.state.bom && !this.locations_kicked) {
            debugger;
            locations.forEach(
                location => this.getForLocation(location).then(
                    data => {
                        this.setState({
                            locations: this.state.locations.concat([data])
                        })
                    }
                )
            )
            this.locations_kicked = true;
        }

        if (this.state.locations.length < locations.length) {
            return <span>Loaded {this.state.locations.length} of {locations.length}</span>
        }

        if (!this.props.location) {
            return <div>Click the button in the top right to get your location</div>
        }

        if (!this.state.data) {
            this.getForLocation(
                this.props.location
            ).then(data => this.setState({data: data}));

            return <span>
                Loading data
                <hr/>
                {JSON.stringify(this.props.location)}
            </span>;
        }

        var position = [
            this.props.location.latitude,
            this.props.location.longitude,
        ];

        var markers = [
            <Marker position={position}>
                <Popup>
                    <span>
                        Something liekl this?
                    </span>
                </Popup>
            </Marker>
        ];

        var data = [
            position.concat([50])
        ]

        return <Map center={position} zoom={13}>
            <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'>
            </TileLayer>
            <HeatLayer data={data}/>
            {markers}
        </Map>
    }
}

export default MapPage;
