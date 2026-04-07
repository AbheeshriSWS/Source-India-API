import React from "react";
import Home from "./pages/Home";
import ProductCategories from "./pages/ProductCategories";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<ProductCategories />} />
    </Routes>
  );
}

export default App;