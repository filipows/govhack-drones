import {GridLayer} from 'react-leaflet'
import 'leaflet.heat'; // add the heatLayer attr to L
import L from 'leaflet';


class HeatLayer extends GridLayer {
    createLeafletElement(props) {
        const {data, ...options} = props;

        return L.heatLayer(
            data,
            this.getOptions(options)
        );
    }
    updateLeafletElement(fromProps, toProps) {
        super.updateLeafletElement(fromProps, toProps)
    }
}

export default HeatLayer;
