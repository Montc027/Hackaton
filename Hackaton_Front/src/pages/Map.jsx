import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import data from "../../Datos.json"; 

function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPTOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [2.18200417667745, 41.3828840594187],
      zoom: 12,
    });

    map.on("load", () => {
      const allPoints = data
        .filter(() => Math.random() < 0.1)
        .map((d) => ({
          type: "Feature",
          properties: {
            name: d.NOM_BARRI,
            district: d.NOM_DISTRICTE,
            id: d.NUMERO_REGISTRE_GENERALITAT,
            free: Math.random() < 0.2,
          },
          geometry: {
            type: "Point",
            coordinates: [
              parseFloat(d.LONGITUD_X.replace(",", ".")),
              parseFloat(d.LATITUD_Y.replace(",", ".")),
            ],
          },
        }));

      const geojsonNormal = {
        type: "FeatureCollection",
        features: allPoints.filter(p => !p.properties.free),
      };

      const geojsonFree = {
        type: "FeatureCollection",
        features: allPoints.filter(p => p.properties.free),
      };

      map.addSource("points", { type: "geojson", data: geojsonNormal });
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

      map.addSource("free-points", { type: "geojson", data: geojsonFree });
      map.addLayer({
        id: "free-points-layer",
        type: "circle",
        source: "free-points",
        paint: {
          "circle-radius": 8,
          "circle-color": "#4ade80",
          "circle-stroke-color": "#fff",
          "circle-stroke-width": 1,
        },
      });

      map.on("click", "points-layer", (e) => {
        const feature = e.features[0];
        const { name, district, id } = feature.properties;
        setSelectedPoint({ name, district, id });
        setIsFree(false);
        setSubmitted(false);
        setEmail("");
      });

      map.on("click", "free-points-layer", (e) => {
        const feature = e.features[0];
        const { name, district, id } = feature.properties;
        setSelectedPoint({ name, district, id });
        setIsFree(true);
        setSubmitted(false);
        setEmail("");
      });

      map.on("mouseenter", "points-layer", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "points-layer", () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("mouseenter", "free-points-layer", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "free-points-layer", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
<div className="flex flex-col items-center justify-center space-y-4">
  <div className="flex justify-center items-start w-full max-w-[1000px] space-x-4">
    <div
      id="map-container"
      ref={mapContainerRef}
      className="h-[500px] w-[700px] rounded-xl shadow-lg"
    />

    {/* Leyenda / gráfico */}
    <div className="flex flex-col justify-start w-[280px] bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-bold mb-2">Leyenda de colores</h3>
      <div className="flex items-center mb-2">
        <div className="w-6 h-6 bg-red-500 rounded-full mr-2"></div>
        <span>Piso ocupado</span>
      </div>
      <div className="flex items-center">
        <div className="w-8 h-8 bg-green-400 rounded-full mr-2"></div>
        <span>Piso libre</span>
      </div>
    </div>
  </div>

  {/* Información debajo del mapa */}
  {selectedPoint && !isFree && (
    <div className="mt-4 p-4 w-full max-w-[1000px] bg-white rounded-xl shadow-md text-center">
      <h2 className="text-lg font-bold">{selectedPoint.name}</h2>
      <p>District: {selectedPoint.district}</p>
      <p>ID: {selectedPoint.id}</p>
    </div>
  )}

  {selectedPoint && isFree && (
    <div className="mt-4 p-6 w-full max-w-[1000px] bg-green-100 rounded-xl shadow-lg text-center border-2 border-green-400">
      {!submitted ? (
        <>
          <h2 className="text-xl font-extrabold text-green-700 mb-2">¡Libre!</h2>
          <p className="text-green-800 mb-4">
            El piso en {selectedPoint.name} es tu oportunidad.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Introduce tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 border border-green-400 rounded mb-2 w-64 text-center"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Enviar
            </button>
          </form>
        </>
      ) : (
        <p className="text-green-900 font-semibold">
          ¡Gracias! Hemos recibido tu correo. Nos pondremos en contacto contigo.
        </p>
      )}
    </div>
  )}
</div>

  );
}

export default Map;
