import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Ranking from "./pages/Ranking";
import Recomendaciones from "./pages/Recomendaciones";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
