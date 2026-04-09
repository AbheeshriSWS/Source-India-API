import { useParams } from "react-router-dom";

import DynamicMeta from "../components/DynamicMeta.jsx";
import Header from "../components/Header.jsx";
import ProductDetail from "../components/ProductDetail.jsx";
import Footer from "../components/Footer.jsx";


function ProductDetailPage() {
  return (
    <>
            <DynamicMeta />
            <Header />
            <ProductDetail />;
            <Footer />
    </>
  );
}

export default ProductDetailPage;
