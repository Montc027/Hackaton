    import React, { useEffect, useState } from "react";

    function Recomendaciones() {
    const [pisos, setPisos] = useState([]);
    const [pisosAgrupados, setPisosAgrupados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDistrict, setOpenDistrict] = useState(null);

    useEffect(() => {
        fetch("https://hackaton-production-cdcd.up.railway.app/api/pisos")
        .then((response) => {
            if (!response.ok) throw new Error("Error al obtener los pisos");
            return response.json();
        })
        .then((data) => {
            setPisos(data);
            setLoading(false);

            const pisosPorDistrito = data.reduce((acc, piso) => {
            const distrito = piso.NOM_DISTRICTE;
            if (!acc[distrito]) acc[distrito] = [];
            acc[distrito].push(piso);
            return acc;
            }, {});
            setPisosAgrupados(pisosPorDistrito);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    if (loading) return <p className="text-center mt-10">Cargando pisos...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    const toggleDistrict = (district) => {
        setOpenDistrict(openDistrict === district ? null : district);
    };

    const districtKeys = Object.keys(pisosAgrupados);
    const midIndex = Math.ceil(districtKeys.length / 2);
    const leftDistricts = districtKeys.slice(0, midIndex);
    const rightDistricts = districtKeys.slice(midIndex);

    return (
        <main className="px-4 py-10 max-w-6xl mx-auto">
        <header>
            <h2 className="text-3xl font-bold mb-8 text-center">
            Recomendaciones de Pisos Turísticos
            </h2>
        </header>

        <section className="grid grid-cols-2 gap-6">
            {[leftDistricts, rightDistricts].map((column, colIndex) => (
            <ul key={colIndex} className="space-y-6">
                {column.map((district) => (
                <li key={district} className="border rounded-lg overflow-hidden">
                    <button
                    onClick={() => toggleDistrict(district)}
                    className={`w-full flex justify-between items-center px-4 py-3 font-semibold focus:outline-none
                        ${
                        openDistrict === district
                            ? "bg-[#002538] text-white"
                            : "bg-[#003957] text-white"
                        }`}
                    >
                    {district}
                    <span>{openDistrict === district ? "▲" : "▼"}</span>
                    </button>

                    {openDistrict === district && (
                    <ul className="bg-white p-4 grid grid-cols-2 gap-4">
                        {pisosAgrupados[district].map((piso) => (
                        <li
                            key={piso.id}
                            className="border rounded-md p-3 bg-blue-50"
                        >
                            <h3 className="font-semibold text-blue-800">{piso.NOM_BARRI}</h3>
                            <p className="text-gray-600">{piso.PIS}</p>
                            <p className="text-gray-500 text-sm">{piso.PORTA}</p>
                        </li>
                        ))}
                    </ul>
                    )}
                </li>
                ))}
            </ul>
            ))}
        </section>
        </main>
    );
    }

    export default Recomendaciones;
