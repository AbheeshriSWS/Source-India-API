import DynamicMeta from "../components/DynamicMeta.jsx";
import Header from "../components/Header.jsx";
import ProductComponent from "../components/ProductComponent.jsx";
import Footer from "../components/Footer.jsx";


function Product() {
  return (
    <>
            <DynamicMeta />
            <Header />
            <ProductComponent />;
            <Footer />
    </>
  );
}

export default Product;
