import React from 'react'
import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
  const mapRef = useRef()
  const mapContainerRef = useRef()

    useEffect(() => {
    const apiKey = import.meta.env.VITE_mapToken;
    mapboxgl.accessToken = apiKey;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])



  return (
    <>
       <div id='map-container' className='h-[500px] w-[700px]' ref={mapContainerRef}/>
    </>
  )
}

export default Map