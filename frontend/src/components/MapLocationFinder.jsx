import { useMapEvents } from 'react-leaflet'
import geocoder from '../utils/geocoder';

export default function MapLocationFinder({ onClick }) {
  const map = useMapEvents({
    click: (event) => {
      map.setView(event.latlng)
      geocoder.reverse(event.latlng, map.options.crs.scale(map.getZoom()), (result) => {
        onClick && onClick({
          name: result[0].name,
          latlng: [result[0].center.lat, result[0].center.lng]
        })
      })
    },
  })
  return null
}
