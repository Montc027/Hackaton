    import React from "react";
    import Header from "../components/Header";
    import Footer from "../components/Footer";

    function Ranking() {
    const barrios = [
        { nombre: "Barri Gòtic", presion: 95 },
        { nombre: "El Raval", presion: 80 },
        { nombre: "Gràcia", presion: 70 },
        { nombre: "Eixample", presion: 60 },
    ];

    return (
        <main className="flex flex-col items-center mt-10 px-4">
        <h1 className="text-5xl font-bold mb-10">Ranking de Barrios</h1>
        <section className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6">
            {barrios.map((barrio, index) => (
            <div
                key={index}
                className="bg-[#D9D9D9] p-6 rounded-2xl shadow-lg text-center"
            >
                <h2 className="text-2xl font-semibold mb-2">{barrio.nombre}</h2>
                <p className="text-gray-700">Presión turística: {barrio.presion}%</p>
            </div>
            ))}
        </section>
        </main>
    );
    }

    export default Ranking;
