import DynamicMeta from "../components/DynamicMeta";
import Header from "../components/Header";
import Component from "../components/Component";
import EMS from "../components/EMS";
import FinishedProduct from "../components/FinishedProduct";
import Hardware from "../components/Hardware";
import IE from "../components/IE";
import MET from "../components/MET";
import Featured from "../components/Featured";
import Footer from "../components/Footer";

function ProductCategories() {
  return (
    <>
            <DynamicMeta />
            <Header />
            <Component />
            <EMS />
            <FinishedProduct />
            <Hardware />
            <IE />
            <MET />
            <Featured />
            <Footer />
    </>
  );
}

export default ProductCategories;
