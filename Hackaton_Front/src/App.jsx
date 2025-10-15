import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Ranking from "./pages/Ranking";
import Recomendaciones from "./pages/Recomendaciones";
import Map from "./pages/Map";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/mapa" element={<Map /> } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
