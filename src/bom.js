class ForecastsGridInterval {
    constructor(bom, url_base) {
        this._bom = bom;
        this.url_base = url_base;
    }

    get(forecast_type, hash) {
        if (arguments.length === 2) {
            return this._bom.encodeGeoHash(
                arguments[0],
                arguments[1]
            ).then(this.get.bind(this, forecast_type));
        }

        return fetch(
            `${this.url_base}/${hash}/${forecast_type}`,
            {
                headers: {
                    "accept": "application/vnd.api+json",
                    "x-api-key": this._bom.api_key
                }
            }
        ).then(res => res.json())
    }
}


class ForecastsGrid {
    constructor(bom, url_base) {
        this._bom = bom;
        this.url_base = url_base
    }

    interval(inter) {
        return ForecastsGridInterval(
            this._bom,
            url_base + '/' + inter
        );
    }
}


class Forecasts {
    constructor(bom) {
        this._bom = bom;
        this.url_base = bom.url_base + '/forecasts/v1'
    }

    grid(){
        return new ForecastsGrid(
            this._bom,
            this.url_base + '/grid'
        );
    }

    grid_three_hourly(hash) {
        return this.grid().interval('three-hourly').get(hash);
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
