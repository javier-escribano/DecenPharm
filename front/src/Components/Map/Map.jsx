import { GoogleMap, LoadScript, PolylineF } from '@react-google-maps/api'
//import keys from '../../secrets.json'
import { coordsParser } from '../../utils'
import MarkerWrapper from '../MarkerWrapper/MarkerWrapper'

const Map = ({ coords }) => {
  const allCoords = coords.map((c) => {
    let coord = coordsParser(c)
    return { lat: coord.latitude, lng: coord.longitude }
  })

  const defaultCoords = coordsParser(coords[0])

  const center = {
    lat: defaultCoords.latitude,
    lng: defaultCoords.longitude,
  }

  return (
    <LoadScript googleMapsApiKey='AIzaSyC4sKFrjCJg8IjZhQ3s_i-vISNG0A_IIZg'>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%',
        }}
        center={center}
        zoom={7}
      >
        {allCoords.map((c) => {
          return <MarkerWrapper key={`${c.lat}${c.lng}`} position={c} />
        })}
        <PolylineF
          path={allCoords}
          options={{
            strokeColor: '#EA4335',
            strokeWeight: 2,
            
          }}
        />
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
