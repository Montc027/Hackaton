import { useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import Heatmap from "../components/Heatmap";
import { puntosConPesoPorDistrito } from "../components/transform";
const hutsRaw=await fetch("https://hackaton-production-cdcd.up.railway.app/api/pisosFull").then(data => data.json());

function colorPorWeight(w) {
  if (w >= 0.30) return "#dc2626";
  if (w >= 0.20) return "#f97316";
  if (w >= 0.11) return "#f59e0b";
  return "#22c55e";
}

export default function MapaHuts() {
  const [mostrarHUTs, setmostrarHUTs] = useState(true);

  const { puntos, counts } = useMemo(
    () => puntosConPesoPorDistrito(hutsRaw),
    []
  );

  const resumen = useMemo(() => {
    const total = puntos.length;
    const ranking = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
    const [topNombre, topCount] = ranking[0] || ["—", 0];
    const topPct = total ? ((topCount / total) * 100).toFixed(1) : "0.0";
    const top3 = ranking
      .slice(0, 3)
      .map(([n, c]) => `${n} (${((c / total) * 100).toFixed(1)}%)`)
      .join(", ");
    return { total, topNombre, topCount, topPct, top3 };
  }, [puntos, counts]);


  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }}>
        <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={mostrarHUTs}
            onChange={(e) => setmostrarHUTs(e.target.checked)}
          />
          Densidad de HUTs (viviendas de uso turístico)
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

          <Heatmap points={puntos} visible={mostrarHUTs} />

          {mostrarHUTs &&
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

      <div
        style={{
          marginTop: 12,
          color: "#334155",
          fontSize: 18,
          lineHeight: 1.6,
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <strong>Resumen de densidad de HUTs por distrito</strong><br />
        En el conjunto de datos se identifican <strong>{resumen.total}</strong> registros de viviendas de uso turístico.
        La mayor concentración se observa en <strong>{resumen.topNombre}</strong> con <strong>{resumen.topCount}</strong> registros
        ({resumen.topPct}% del total).<br />
        <span style={{ opacity: 0.9 }}>
          Top 3 distritos por presencia relativa: {resumen.top3}.
        </span>
        <br />
        <em style={{ fontSize: 15 }}>
          Interpretación de colores: verde = bajo, amarillo = medio, naranja = alto, rojo = muy alto (según la frecuencia del distrito en el dataset).
          Puedes activar/desactivar la capa con el check “Densidad de HUTs”.
        </em>
      </div>
    </div>
  );
}