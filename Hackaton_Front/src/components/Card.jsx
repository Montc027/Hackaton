            import React from "react";

            function Card({ emoji, title, description, buttonText, route }) {
            return (
    <a
    href={route}
    className="block bg-white p-10 rounded-3xl shadow-2xl w-72 sm:w-80 lg:w-96 text-center mb-8 hover:shadow-black/50 transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
    <section className="text-7xl mb-6">{emoji}</section>
    <h3 className="text-3xl font-bold mb-4">{title}</h3>
    <p className="text-gray-700 mb-6">{description}</p>
    {buttonText && (
        <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300">
        {buttonText}
        </button>
    )}
    </a>


            );
            }

            export default Card;
