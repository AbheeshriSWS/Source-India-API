import React from "react";
import Home from "./pages/Home";
import ProductCategories from "./pages/ProductCategories";
import Automotive from "./pages/Automotive";
import Product from "./pages/Product";
import Detail from "./pages/Detail";
import Seller from "./pages/SellerListing";
import SellerDetail from "./pages/SellerDetail";
import Buyer from "./pages/Buyer";
import Distributor from "./pages/Distributor";
import DistributorDetail from "./pages/DistributorDetail";
import Enquiry from "./pages/Enquiry";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<ProductCategories />} />
      <Route path="/categories/component/automotive-components" element={<Automotive />} />
      <Route path="/products" element={<Product />} />
      <Route path="/products/:productId" element={<Detail />} />
      <Route path="/company-list" element={<Seller />} />
      <Route path="/company/:slug" element={<SellerDetail />} />
      <Route path="/buyer-list" element={<Buyer />} />
      <Route path="/trading-list" element={<Distributor />} />
      <Route path="/trading-list/:slug" element={<DistributorDetail />} />
      <Route path="/enquiry" element={<Enquiry />} />
    </Routes>
  );
}

export default App;   

