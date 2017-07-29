
class Forecasts {
    constructor(bom) {
        this._bom = bom;
        this.url_base = bom.url_base + '/forecasts/v1'
    }

    grid_three_hourly(/* lat, lon || hash */) {
        if (arguments.length === 2) {
            return this.encodeGeoHash(
                arguments[0],
                arguments[1]
            ).then(this.grid_three_hourly.bind(this));
        }

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

    encodeGeoHash(lat, lon) {
        return fetch(
            `${this.url_base}/locations/v1/geohashes` +
            `?latitude=${lat}&longitude=${lon}`,
            {
                headers: {
                    "x-api-key": this.api_key
                }
            }
        )
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                console.log(data.errors);
                return Promise.reject(data.errors);
            }

            return data.data[0]["attributes"]["geohash"];
        })
    }
}

export default BOM;
