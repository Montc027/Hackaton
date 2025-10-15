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
        features: allPoints.filter((p) => !p.properties.free),
      };

      const geojsonFree = {
        type: "FeatureCollection",
        features: allPoints.filter((p) => p.properties.free),
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
          "circle-radius": 7,
          "circle-color": "#EF4444",
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
          "circle-radius": 9,
          "circle-color": "#22C55E",
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

    const updateStats = () => {
      if (!mapRef.current) return;
      const map = mapRef.current;
      const occupiedFeatures = map.queryRenderedFeatures({ layers: ["points-layer"] });
      const freeFeatures = map.queryRenderedFeatures({ layers: ["free-points-layer"] });
      setStats({ occupied: occupiedFeatures.length, free: freeFeatures.length });
    };

    map.on("move", updateStats);
    return () => {
      map.off("move", updateStats);
      map.remove();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    fetch("https://hackaton-production-cdcd.up.railway.app/api/suscribirse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }), 
    })
      .then((response) => response.json())
      .then((data) => console.log("Respuesta recibida:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <section className="flex flex-col items-center justify-start px-6 py-12 space-y-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#8C1758] tracking-wide leading-snug text-center drop-shadow-md max-w-[900px]">
        Mapa de pisos
      </h2>

      <section className="relative w-full max-w-[900px]">
        <div
          ref={mapContainerRef}
          id="map-container"
          className="h-[500px] w-full rounded-2xl shadow-xl border border-gray-300"
        />
        <section className="absolute top-4 left-4 bg-white p-2 rounded shadow-md z-10">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span>{stats.occupied}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-400 rounded-full"></div>
            <span>{stats.free}</span>
          </div>
        </section>
      </section>

      <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4 text-center max-w-[900px]">
        Haz clic en los puntos del mapa para ver más información sobre cada piso. Los verdes están libres y los rojos ocupados.
      </h3>

      {selectedPoint && (
        <section className="w-full max-w-[900px] bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
          <h2 className="text-xl font-bold mb-2 text-gray-800">{selectedPoint.name}</h2>
          <p className="text-gray-600">District: {selectedPoint.district}</p>
          <p className="text-gray-600 mb-4">ID: {selectedPoint.id}</p>

          {isFree ? (
            !submitted ? (
              <>
                <p className="text-green-700 font-semibold mb-3">
                  El piso está libre ¡Es tu oportunidad!
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
            <p className="text-red-600 font-medium">Este piso actualmente está ocupado.</p>
          )}
        </section>
      )}
    </section>
  );
}

export default Map;
