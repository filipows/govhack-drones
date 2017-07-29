class ForecastsGridInterval {
    constructor(bom, url_base) {
        this._bom = bom;
        this.url_base = url_base;
    }

    get(forecast_type, loc) {
        if (typeof loc !== 'string') {
            return (
                this._bom
                .encodeGeoHash(loc)
                .then(this.get.bind(this, forecast_type))
            );
        }

        return fetch(
            `${this.url_base}/${loc}/${forecast_type}`,
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
        return new ForecastsGridInterval(
            this._bom,
            this.url_base + '/' + inter
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
}


class BOM {
    constructor(api_key) {
        this.url_base = 'https://api.cloud.bom.gov.au'
        this.api_key = api_key;
    }

    forecasts() {
        return new Forecasts(this);
    }

    encodeGeoHash(loc) {
        return fetch(
            `${this.url_base}/locations/v1/geohashes` +
            `?latitude=${loc.latitude}&longitude=${loc.longitude}`,
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
