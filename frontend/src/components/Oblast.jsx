import React from 'react'
import { Polygon } from 'react-leaflet'

export default function Oblast({oblastData}) {

  const correctCoordinates = oblastData.geometry.coordinates.flat().map(coord => ([coord[1], coord[0]]))
  
  return (
    <Polygon 
      pathOptions={{ color: 'grey', fillOpacity: 0.25 }} 
      positions={correctCoordinates}
      eventHandlers={{
        mouseover: (event) => event.target.setStyle({ fillOpacity: 0.6 }),
        mouseout: (event) => event.target.setStyle({ fillOpacity: 0.25 }),
      }}
    />
  )
}
