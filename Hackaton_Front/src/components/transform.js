// Convierte "41,3784" -> 41.3784
function parseEU(n) {
  if (typeof n === "number") return n;
  if (typeof n !== "string") return NaN;
  return Number(n.replace(",", "."));
}

/**
 * A partir del JSON del ayuntamiento (array de objetos),
 * devuelve un array de puntos [{lat, lng, weight, distrito}]
 * donde weight = escala 0..1 según el número de registros del NOM_DISTRICTE.
 */
export function puntosConPesoPorDistrito(jsonArray) {
  const rows = Array.isArray(jsonArray) ? jsonArray : [];
console.log(jsonArray)

  // 1) Conteo por distrito
  const counts = new Map();
  for (const r of rows) {
    const d = r.NOM_DISTRICTE || "DESCONOCIDO";
    counts.set(d, (counts.get(d) || 0) + 1);
  }

  // 2) min/max para normalizar 0..1
  const valores = [...counts.values()];
  const min = Math.min(...valores);
  const max = Math.max(...valores);
  const rango = Math.max(1, max - min); // evita división por 0

  // 3) Generar puntos con peso por distrito
  let puntos = [];
  for (let r of rows) {
    let lat = parseEU(r.LATITUD_Y);
    let lng = parseEU(r.LONGITUD_X);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

    let distrito = r.NOM_DISTRICTE || "DESCONOCIDO";
    let count = counts.get(distrito) || 1;

    // Normalización lineal 0..1 (min->0, max->1)
    let weight = (count - min) / rango;

    // asegura un mínimo visual para que se vea en el heatmap
    weight = Math.max(0.1, Math.min(1, weight));

    puntos.push({ lat, lng, weight, distrito, count });
  }

  return { puntos, counts, min, max };
}
