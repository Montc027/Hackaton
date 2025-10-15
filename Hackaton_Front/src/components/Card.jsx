    import React from "react";

    function Card({ emoji, title, description, buttonText, route }) {
    return (
        <a
        href={route}
        className="block bg-[#D9D9D9] p-10 sm:p-12 rounded-3xl shadow-lg 
                    w-80 sm:w-96 lg:w-[28rem] text-center mx-auto mb-10
                    hover:shadow-xl hover:scale-105 transition-all duration-300 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <section className="text-7xl mb-6">{emoji}</section>
        <h3 className="text-3xl font-bold mb-4 text-gray-900">{title}</h3>
        <p className="text-gray-700 mb-8 text-lg leading-relaxed">{description}</p>
        {buttonText && (
            <button
            style={{ backgroundColor: "#003957" }}
            className="text-white px-8 py-4 rounded-lg text-lg 
                        hover:brightness-110 focus:outline-none 
                        focus:ring-2 focus:ring-blue-400 transition duration-300 cursor-pointer"
            >
            {buttonText}
            </button>
        )}
        </a>
    );
    }

    export default Card;
