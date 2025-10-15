function parseEU(n) {
  if (typeof n === "number") return n;
  if (typeof n !== "string") return NaN;
  return Number(n.replace(",", "."));
}

export function puntosConPesoPorDistrito(jsonArray) {
  const rows = Array.isArray(jsonArray) ? jsonArray : [];

  const counts = new Map();
  for (const r of rows) {
    const d = r.NOM_DISTRICTE || "DESCONOCIDO";
    counts.set(d, (counts.get(d) || 0) + 1);
  }

  const valores = [...counts.values()];
  const min = Math.min(...valores);
  const max = Math.max(...valores);
  const rango = Math.max(1, max - min);

  let puntos = [];
  for (let r of rows) {
    let lat = parseEU(r.LATITUD_Y);
    let lng = parseEU(r.LONGITUD_X);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

    let distrito = r.NOM_DISTRICTE || "DESCONOCIDO";
    let count = counts.get(distrito) || 1;
    let weight = (count - min) / rango;

    weight = Math.max(0.1, Math.min(1, weight));

    puntos.push({ lat, lng, weight, distrito, count });
  }

  return { puntos, counts, min, max };
}