import MapaHuts from "./pages/MapaHuts";
import React from "react";

import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Ranking from "./pages/Ranking";
import Recomendaciones from "./pages/Recomendaciones";
import Map from "./pages/Map";
import ChatbotWrapper from "./components/ChatbotWrapper";


function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/graficos" element={<MapaHuts />} />
        <Route path="/" element={<Home />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/mapa" element={<Map /> } />
      </Routes>
      <ChatbotWrapper />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
