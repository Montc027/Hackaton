import { useMemo } from "react";
import { motion } from "framer-motion";
import datos from "../../Datos.json";

export default function Ranking() {
  const { rankingSaturados, rankingTranquilos } = useMemo(() => {
    const counts = {};
    datos.forEach((d) => {
      const barrio = `${d.NOM_BARRI} (${d.NOM_DISTRICTE})`;
      if (!counts[barrio]) counts[barrio] = 0;
      counts[barrio] += 1;
    });

    const arr = Object.entries(counts).map(([barrio, peso]) => ({
      barrio,
      peso,
    }));

    // top 5 saturados (más registros)
    const rankingSaturados = arr
      .slice()
      .sort((a, b) => b.peso - a.peso)
      .slice(0, 5)
      .map((item, index) => ({ ...item, posicion: index + 1 }));


    // top 5 tranquilos (menos registros)
    const rankingTranquilos = arr
      .slice()
      .sort((a, b) => a.peso - b.peso)
      .slice(0, 5)
      .map((item, index) => ({ ...item, posicion: index + 1 }));

    return { rankingSaturados, rankingTranquilos };
  }, []);

  const descripcionScore =
    "El puntaje representa el número de propiedades (viviendas) registradas en cada barrio. Más registros = barrio más saturado.";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold text-[#8C1758] tracking-wide leading-snug text-center drop-shadow-md max-w-[900px] mx-auto mb-20">
        Ranking de Barrios
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        {/* Top 5 Tranquilos */}
        <div>
          <h3 className="text-xl font-bold mb-2 text-center text-green-600">
            Top 5 Barrios más tranquilos
          </h3>
          <motion.div className="flex flex-col gap-3">
            {rankingTranquilos.map((r) =>
              r.posicion === 1 ? (
                <motion.div
                  key={r.barrio}
                  className="relative rounded-2xl shadow-lg h-[180px] flex items-center justify-center text-white font-bold text-xl"
                  style={{
                    backgroundImage: "url('/barcelona_ciudad.jpg')", 
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                  <div className="relative z-10 text-center">
                    #{r.posicion}. {r.barrio} — {r.peso}
                  </div>
                </motion.div>
              ) : (
                // resto de la lista
                <motion.div
                  key={r.barrio}
                  className="flex justify-between items-center p-3 rounded-lg shadow-md bg-green-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span>
                    #{r.posicion}. {r.barrio}
                  </span>
                  <span
                    className="font-mono underline decoration-dotted cursor-help"
                    title={descripcionScore}
                  >
                    {r.peso}
                  </span>
                </motion.div>
              )
            )}
          </motion.div>
        </div>

        {/* Top 5 Saturados */}
        <div>
          <h3 className="text-xl font-bold mb-2 text-center text-red-600">
            Top 5 Barrios más saturados
          </h3>
          <motion.div className="flex flex-col gap-3">
            {rankingSaturados.map((r) =>
              r.posicion === 1 ? (
                <motion.div
                  key={r.barrio}
                  className="relative rounded-2xl shadow-lg h-[180px] flex items-center justify-center text-white font-bold text-xl"
                  style={{
                    backgroundImage: "url('/bcn_saturados.jpg')", 
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                  <div className="relative z-10 text-center">
                    #{r.posicion}. {r.barrio} — {r.peso}
                  </div>
                </motion.div>
              ) : (
                // resto
                <motion.div
                  key={r.barrio}
                  className="flex justify-between items-center p-3 rounded-lg shadow-md bg-red-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span>
                    #{r.posicion}. {r.barrio}
                  </span>
                  <span
                    className="font-mono underline decoration-dotted cursor-help"
                    title={descripcionScore}
                  >
                    {r.peso}
                  </span>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
