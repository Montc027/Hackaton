import React from "react";
import ChatBot from "react-chatbotify";

export default function ChatbotWrapper() {
    const flow = {
        start: {
            message: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?",
            path: "loop",
        },
        loop: {
            message: async ({ userInput }) => {
                const input = userInput.toLowerCase();
                if (input.includes("hola")) return "¡Hola! ¿Cómo estás?";
                if (input.includes("adiós")) return "Hasta luego.";
                return "No estoy seguro, ¿puedes explicarme más?";
            },
            path: "loop",
        },
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <ChatBot flow={flow} />
        </div>
    );
}