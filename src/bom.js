import {Geohash} from 'geohash';

function _hash(args) {
    debugger;
    var hash = args[0];
    if (args.length === 2) {
        hash = Geohash.encodeGeoHash(args[0], arguments[1]);
    }
    return hash;
}


class Forecasts {
    constructor(bom) {
        this._bom = bom;
        this.url_base = bom.url_base + '/forecasts/v1'
    }

    grid_three_hourly(/* lat, lon || hash */) {
        var hash = _hash(arguments);

        return fetch(
            `${this.url_base}/grid/three-hourly/${hash}/wind`,
            {
                headers: {
                    "accept": "application/vnd.api+json",
                    "x-api-key": this._bom.api_key
                }
            }
        ).then(res => res.json())
    }
}


class BOM {
    constructor(api_key) {
        this.url_base = 'https://api.cloud.bom.gov.au'
        this.api_key = api_key;
    }

    forecasts() {
        return new Forecasts(this);
    }
}

export default BOM;
