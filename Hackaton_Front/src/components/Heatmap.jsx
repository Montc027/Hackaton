// src/components/Heatmap.jsx
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function Heatmap({ points = [], visible = true }) {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    // Si el plugin no está cargado, avisa y no intentes crear la capa
    if (!L.heatLayer) {
      console.warn("[Heatmap] leaflet.heat no está disponible todavía.");
      // elimina cualquier capa anterior por si acaso
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
      return;
    }

    if (!visible) {
      // Ocultar capa
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
        console.log("[Heatmap] capa eliminada (visible=false)");
      }
      return;
    }

    // visible === true → crear/actualizar
    if (!Array.isArray(points) || points.length === 0) {
      console.warn("[Heatmap] no hay puntos que pintar.");
      // no creamos capa vacía
      return;
    }

    const latlngs = points.map(p => [
      Number(p.lat),
      Number(p.lng),
      Math.max(0, Math.min(1, Number(p.weight ?? 0.6))),
    ]);

    if (layerRef.current) {
      layerRef.current.setLatLngs(latlngs);
      console.log(`[Heatmap] actualizados ${latlngs.length} puntos.`);
    } else {
      layerRef.current = L.heatLayer(latlngs, {
        radius: 26,
        blur: 20,
        gradient: { 0.2:"#22c55e", 0.5:"#f59e0b", 0.8:"#f97316", 1:"#dc2626" },
      }).addTo(map);
      console.log(`[Heatmap] creada capa con ${latlngs.length} puntos.`);
    }
  }, [map, points, visible]);

  // limpieza al desmontar
  useEffect(() => {
    return () => {
      if (layerRef.current && map) map.removeLayer(layerRef.current);
    };
  }, [map]);

  return null;
}
