import L from 'leaflet'
import 'leaflet-control-geocoder';

const geocoder = L.Control.Geocoder.nominatim();

export default geocoder