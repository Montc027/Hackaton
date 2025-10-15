    import React, { useEffect, useState } from "react";

    function Recomendaciones() {
    const [pisos, setPisos] = useState([]);
    const [pisosAgrupados, setPisosAgrupados] = useState([]);
    const [loading, setLoading] = useState(true); // para mostrar un estado de carga
    const [error, setError] = useState(null); // para manejar errores
      const [openDistrict, setOpenDistrict] = useState(null);


    console.log(pisosAgrupados)
    useEffect(() => {
        // hacemos la petición a la API
        fetch("https://hackaton-production-cdcd.up.railway.app/api/pisos")
        .then((response) => {
            if (!response.ok) {
            throw new Error("Error al obtener los pisos");
            }
            return response.json();
        })
        .then((data) => {
            setPisos(data); // guardamos los datos en el estado
            setLoading(false);
            // Agrupamos por distrito
            const pisosPorDistrito = data.reduce((acc, piso) => {
            const distrito = piso.NOM_DISTRICTE;
            if (!acc[distrito]) {
                acc[distrito] = [];
            }
            acc[distrito].push(piso);
            return acc;
            }, {});
            console.log(pisosPorDistrito)
            setPisosAgrupados(pisosPorDistrito);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Cargando pisos...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }
     const toggleDistrict = (district) => {
    setOpenDistrict(openDistrict === district ? null : district);
}

    return (
        <main className="px-4 py-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
            Recomendaciones de Pisos Turísticos
        </h2>

        <div className="space-y-4">
            {Object.keys(pisosAgrupados).map((district) => (
            <div key={district} className="border rounded-lg overflow-hidden">
                <button
                onClick={() => toggleDistrict(district)}
                className="w-full flex justify-between items-center bg-blue-500 text-white px-4 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                {district}
                <span>{openDistrict === district ? "▲" : "▼"}</span>
                </button>

                {openDistrict === district && (
                <div className="bg-white p-4 space-y-3">
                    {pisosAgrupados[district].map((piso) => (
                    <div
                        key={piso.id}
                        className="border rounded-md p-3 hover:shadow transition-shadow"
                    >
                        <h3 className="font-semibold">{piso.NOM_BARRI}</h3>
                        <p className="text-gray-600">{piso.PIS}</p>
                        <p className="text-gray-500 text-sm">{piso.PORTA}</p>
                    </div>
                    ))}
                </div>
                )}
            </div>
            ))}
        </div>
        </main>
    )
    }

    export default Recomendaciones;
