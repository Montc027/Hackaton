import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function Heatmap({ points = [], visible = true }) {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    if (!L.heatLayer) {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
      return;
    }

    const latlngs = points.map(p => [
      Number(p.lat),
      Number(p.lng),
      Math.max(0, Math.min(1, Number(p.weight ?? 0.6))),
    ]);

    if (layerRef.current) {
      layerRef.current.setLatLngs(latlngs);
    } else {
      layerRef.current = L.heatLayer(latlngs, {
        radius: 26,
        blur: 20,
        gradient: { 0.2:"#22c55e", 0.5:"#f59e0b", 0.8:"#f97316", 1:"#dc2626" },
      }).addTo(map);
    }
  }, [map, points, visible]);

  useEffect(() => {
    return () => {
      if (layerRef.current && map) map.removeLayer(layerRef.current);
    };
  }, [map]);

  return null;
}