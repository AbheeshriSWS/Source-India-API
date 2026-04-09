import React from "react";
import Home from "./pages/Home";
import ProductCategories from "./pages/ProductCategories";
import Automotive from "./pages/Automotive";
import Product from "./pages/Product";
import Detail from "./pages/Detail";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<ProductCategories />} />
      <Route path="/categories/automotive" element={<Automotive />} />
      <Route path="/categories/automotive/products" element={<Product />} />
      <Route path="/categories/:category/products/:productId" element={<Detail />} />
    </Routes>
  );
}

export default App;   