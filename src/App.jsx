import React from "react";
import Home from "./pages/Home";
import ProductCategories from "./pages/ProductCategories";
import Automotive from "./pages/Automotive";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<ProductCategories />} />
      <Route path="/categories/automotive" element={<Automotive />} />
    </Routes>
  );
}

export default App;   