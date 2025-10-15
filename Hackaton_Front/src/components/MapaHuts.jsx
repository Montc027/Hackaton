import { useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import Heatmap from "./Heatmap";
//import hutsRaw from "../../Datos.json";
import { puntosConPesoPorDistrito } from "./transform";
const hutsRaw=await fetch("https://hackaton-production-cdcd.up.railway.app/api/pisos").then(data => data.json());

// Colores por banda (cuartiles)
function colorPorWeight(w) {
  if (w >= 0.30) return "#dc2626"; // rojo (muy alto)
  if (w >= 0.20) return "#f97316"; // naranja (alto)
  if (w >= 0.11) return "#f59e0b"; // amarillo (medio)
  return "#22c55e";                // verde (bajo)
}

export default function MapaHuts() {
  const [mostrarHUTs, setMostrarHUTs] = useState(true);
  const [modoDebug, setModoDebug] = useState(false);

  const { puntos, counts } = useMemo(
    () => puntosConPesoPorDistrito(hutsRaw),
    []
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }}>
        <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={mostrarHUTs}
            onChange={(e) => setMostrarHUTs(e.target.checked)}
          />
          Mostrar densidad HUTs (por distrito)
        </label>

        <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={modoDebug}
            onChange={(e) => setModoDebug(e.target.checked)}
          />
          Modo debug (puntos por distrito)
        </label>

        <div style={{ marginLeft: "auto", fontSize: 12, color: "#475569", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 4, background: "#22c55e" }} />
          Bajo
          <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 4, background: "#f59e0b" }} />
          Medio
          <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 4, background: "#f97316" }} />
          Alto
          <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 4, background: "#dc2626" }} />
          Muy alto
        </div>
      </div>

      <div style={{ height: 520, borderRadius: 16, overflow: "hidden", border: "1px solid #e2e8f0" }}>
        <MapContainer
          center={[41.387, 2.17]}
          zoom={12.6}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* HEATMAP con pesos por distrito */}
          <Heatmap points={puntos} visible={mostrarHUTs} />

          {/* Debug opcional: ver los puntos pintados por banda */}
          {modoDebug &&
            puntos.map((p, i) => (
              <CircleMarker
                key={i}
                center={[p.lat, p.lng]}
                radius={3}
                pathOptions={{ color: colorPorWeight(p.weight), fillColor: colorPorWeight(p.weight), fillOpacity: 0.8 }}
              >
                <Tooltip>
                  {p.distrito} · count={counts.get(p.distrito)} · w={p.weight.toFixed(2)}
                </Tooltip>
              </CircleMarker>
            ))
          }
        </MapContainer>
      </div>
    </div>
  );
}
