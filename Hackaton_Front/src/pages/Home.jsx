    import React from "react";
    import Card from "../components/Card";

    function Home() {
    const cards = [
        { emoji: "🗺️", title: "Mapa", description: "Visualiza cómo el turismo afecta los barrios.", buttonText: "Ver mapa", route: "/mapa" },
        { emoji: "🏆", title: "Ranking", description: "Compara barrios según la presión turística.", buttonText: "Ver ranking", route: "/ranking" },
        { emoji: "💡", title: "Recomendaciones", description: "Consejos útiles para turistas y vecinos.", buttonText: "Ver recomendaciones", route: "/recomendaciones" },
        { emoji: "📊", title: "Concentración de pisos", description: "Consulta estadísticas y análisis visual.", buttonText: "Ver gráficos", route: "/graficos" },
    ];

    return (
        <main className="px-6 py-10">

        <section className="w-full flex justify-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#8C1758] tracking-wide leading-snug text-center drop-shadow-md max-w-[900px]">
            Tu guía para entender el impacto<br />del turismo en los barrios de Barcelona
            </h2>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl justify-items-center mx-auto">
            {cards.map((card, index) => (
            <Card key={index} {...card} />
            ))}
        </section>

        <h3 className="text-gray-700 text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-loose mt-20 mb-16 text-center max-w-3xl mx-auto drop-shadow-sm">
            Esta aplicación te ayuda a encontrar el equilibrio perfecto entre calidad de vida y turismo. 
            Explora datos, mapas y recomendaciones para elegir dónde vivir o cómo moverte por la ciudad 
            según la presión turística de cada barrio.
        </h3>
        </main>
    );
    }

    export default Home;
