import { MarkerF, InfoWindowF } from '@react-google-maps/api'
import { useState } from 'react'

const MarkerWrapper = ({ position }) => {
  const [visibleInfo, setVisibleInfo] = useState(false)
  return (
    <div>
      <MarkerF position={position} onClick={() => setVisibleInfo(true)} />
    </div>
  )
}

export default MarkerWrapper
