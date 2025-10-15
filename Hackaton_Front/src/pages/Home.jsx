    import React from "react";
    import Card from "../components/Card";

    function Home() {
    const cards = [
        { emoji: "🗺️", title: "Mapa", description: "Visualiza cómo el turismo afecta los barrios.", buttonText: "Ver mapa", route: "/mapa" },
        { emoji: "🏆", title: "Ranking", description: "Compara barrios según la presión turística.", buttonText: "Ver ranking", route: "/ranking" },
        { emoji: "🚨", title: "Alertas", description: "Recibe avisos sobre zonas saturadas.", buttonText: "Ver alertas", route: "/alertas" },
        { emoji: "💡", title: "Recomendaciones", description: "Consejos útiles para turistas y vecinos.", buttonText: "Ver recomendaciones", route: "/recomendaciones" },
        { emoji: "📊", title: "Gráficos", description: "Consulta estadísticas y análisis visual.", buttonText: "Ver gráficos", route: "/graficos" },
    ];

    return (
        <main className="flex flex-col items-center mt-10 px-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
            <Card key={index} {...card} />
            ))}
        </section>
        </main>
    );
    }

    export default Home;
