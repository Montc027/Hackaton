import React from "react";
import ChatBot from "react-chatbotify";
import { fakeChat } from "../api/chat";

export default function ChatbotWrapper() {
    const flow = {
        start: {
            message: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?",
            path: "loop",
        },
        loop: {
            message: async ({ userInput }) => await fakeChat(userInput),
            path: "loop",
        },
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <ChatBot flow={flow} />
        </div>
    );
}