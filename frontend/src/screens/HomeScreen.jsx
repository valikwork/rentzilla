import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import Oblast from '../components/Oblast';
import uaGeoInfo from '../data/ukraineWithRegions.json';

export default function HomeScreen() {

  const allAdverts = useSelector(state => state.adverts.adverts)
  const position = [50.469647, 30.515440]
  
  const zoom = 6

  return (
    <section className="h-full w-full flex justify-center items-center">
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {[...allAdverts].filter(adv => adv.locationLatLng.length === 2).map(adv => (
          <Marker key={adv['_id']} position={adv.locationLatLng}>
            <Popup>
              {adv.locationName}
            </Popup>
          </Marker>
        ))}
        {uaGeoInfo.features.map(oblast => <Oblast key={oblast.id} oblastData={oblast} />)}
      </MapContainer>
    </section>
  )
}
