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
  const [stats, setStats] = useState({ occupied: 0, free: 0 });

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

      setStats({
        occupied: geojsonNormal.features.length,
        free: geojsonFree.features.length,
      });

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
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    fetch('https://hackaton-production-cdcd.up.railway.app/api/suscribirse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta recibida:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start px-6 py-12 space-y-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        🏙️ Mapa de pisos disponibles
      </h1>

      <div
        ref={mapContainerRef}
        id="map-container"
        className="h-[500px] w-full max-w-[900px] rounded-2xl shadow-xl border border-gray-300"
        style={{ position: "relative" }}
      />

      <div className="w-full max-w-[900px] flex justify-center space-x-8 bg-white p-4 rounded-xl shadow-md border border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          <span className="text-gray-700 font-medium">
            Ocupados: {stats.occupied}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-400 rounded-full"></div>
          <span className="text-gray-700 font-medium">
            Libres: {stats.free}
          </span>
        </div>
      </div>

      {selectedPoint && (
        <div className="w-full max-w-[900px] bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            {selectedPoint.name}
          </h2>
          <p className="text-gray-600">District: {selectedPoint.district}</p>
          <p className="text-gray-600 mb-4">ID: {selectedPoint.id}</p>

          {isFree ? (
            !submitted ? (
              <>
                <p className="text-green-700 font-semibold mb-3">
                  ¡El piso está libre! Es tu oportunidad 🌿
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                  <input
                    type="email"
                    placeholder="Introduce tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-2 border border-green-400 rounded mb-2 w-64 text-center focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Contactar
                  </button>
                </form>
              </>
            ) : (
              <p className="text-green-900 font-semibold">
                ¡Gracias! Nos pondremos en contacto contigo pronto.
              </p>
            )
          ) : (
            <p className="text-red-600 font-medium">
              Este piso actualmente está ocupado.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Map;
