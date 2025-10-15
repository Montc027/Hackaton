import React from 'react'
import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
  const mapRef = useRef()
  const mapContainerRef = useRef()
  return (
    <>
       <div id='map-container' className='h-full w-full' ref={mapContainerRef}/>
    </>
  )
}

export default Map