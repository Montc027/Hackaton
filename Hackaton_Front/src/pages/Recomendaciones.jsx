import React, { useEffect, useState } from "react";
import footerImage from "../assets/footer.webp";

function Recomendaciones() {
    const [pisos, setPisos] = useState([]);
    const [pisosAgrupados, setPisosAgrupados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDistrict, setOpenDistrict] = useState(null);

    useEffect(() => {
        fetch("https://hackaton-production-cdcd.up.railway.app/api/pisosDiez")
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener los pisos");
                return res.json();
            })
            .then((data) => {
                setPisos(data);
                setLoading(false);
                const grouped = data.reduce((acc, piso) => {
                    const distrito = piso.NOM_DISTRICTE;
                    if (!acc[distrito]) acc[distrito] = [];
                    acc[distrito].push(piso);
                    return acc;
                }, {});
                setPisosAgrupados(grouped);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10">Cargando pisos...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    const toggleDistrict = (district) =>
        setOpenDistrict(openDistrict === district ? null : district);

    const districtKeys = Object.keys(pisosAgrupados);
    const midIndex = Math.ceil(districtKeys.length / 2);
    const leftDistricts = districtKeys.slice(0, midIndex);
    const rightDistricts = districtKeys.slice(midIndex);

    return (
        <div className="flex flex-col min-h-screen">
            <main className="px-4 py-10 max-w-6xl mx-auto flex-1">
                <header>
<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold text-[#8C1758] tracking-wide leading-snug text-center drop-shadow-md max-w-[900px] mx-auto mb-8">
  Recomendaciones de pisos turísticos
</h2>
        <h3 className="text-center mb-13 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800">
  Tenemos un total de {pisos.length} pisos distribuidos en{" "}
  {Object.keys(pisosAgrupados).length} distritos.
  <br />
  ¡Explora cada distrito para encontrar tu piso ideal!
</h3>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[leftDistricts, rightDistricts].map((column, colIndex) => (
                        <ul key={colIndex} className="space-y-6">
                            {column.map((district) => (
                                <li
                                    key={district}
                                    className="border rounded-lg overflow-hidden bg-white shadow"
                                >
                                    <button
                                        onClick={() => toggleDistrict(district)}
                                        className={`w-full flex justify-between items-center px-4 py-3 font-semibold focus:outline-none ${openDistrict === district
                                                ? "bg-[#002538] text-white"
                                                : "bg-[#003957] text-white"
                                            }`}
                                    >
                                        {district}
                                        <span>{openDistrict === district ? "▲" : "▼"}</span>
                                    </button>

                                    {openDistrict === district && (
                                        <ul className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {pisosAgrupados[district].map((piso) => (
                                                <li
                                                    key={piso._id}
                                                    className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition-shadow duration-300"
                                                >
                                                    <h3 className="font-bold text-blue-900 text-lg mb-1">
                                                        {piso.NOM_BARRI}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-1">
                                                        {piso.CARRER} {piso.NUM1}
                                                        {piso.NUM2 ? `-{piso.NUM2}` : ""}, Puerta{" "}
                                                        {piso.PORTA}
                                                    </p>
                                                    <p className="text-gray-500 text-sm mb-1">
                                                        Piso: {piso.PIS} | Plazas: {piso.NUMERO_PLACES}
                                                    </p>
                                                    <p className="text-gray-400 text-xs">
                                                        Registro: {piso.NUMERO_REGISTRE_GENERALITAT}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ))}
                </section>

                <div
                    className="w-full h-[500px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden mt-10"
                    style={{
                        backgroundImage: `url(${footerImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>
            </main>

            <footer className="bg-[#003957] text-white py-4 text-center fixed bottom-0 w-full">
                &copy; 2025 Tu Empresa | Todos los derechos reservados
            </footer>
        </div>
    );
}

export default Recomendaciones;
