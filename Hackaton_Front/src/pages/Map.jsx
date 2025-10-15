import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import data from "../../Datos.json"; 

function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPTOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [2.18200417667745, 41.3828840594187],
      zoom: 12,
    });

    map.on("load", () => {
      const geojson = {
        type: "FeatureCollection",
        features: data.map((d) => ({
          type: "Feature",
          properties: {
            name: d.NOM_BARRI,
            district: d.NOM_DISTRICTE,
            id: d.NUMERO_REGISTRE_GENERALITAT,
          },
          geometry: {
            type: "Point",
            coordinates: [
              parseFloat(d.LONGITUD_X.replace(",", ".")),
              parseFloat(d.LATITUD_Y.replace(",", ".")),
            ],
          },
        })),
      };

      map.addSource("points", { type: "geojson", data: geojson });

      map.addLayer({
        id: "points-layer",
        type: "circle",
        source: "points",
        paint: {
          "circle-radius": 6,
          "circle-color": "#FF6B6B",
          "circle-stroke-color": "#fff",
          "circle-stroke-width": 1,
        },
      });

      map.on("click", "points-layer", (e) => {
        const feature = e.features[0];
        const { name, district, id } = feature.properties;
        const coords = feature.geometry.coordinates;

        new mapboxgl.Popup()
          .setLngLat(coords)
          .setHTML(
            `<strong>${name}</strong><br/>District: ${district}<br/>ID: ${id}`
          )
          .addTo(map);
      });

      
      map.on("mouseenter", "points-layer", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "points-layer", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div
        id="map-container"
        ref={mapContainerRef}
        className="h-[500px] w-[700px] rounded-xl shadow-lg"
      />
    </div>
  );
}

export default Map


