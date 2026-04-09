import DynamicMeta from "../components/DynamicMeta.jsx";
import Header from "../components/Header.jsx";
import SellerDetailCompo from "../components/SellerDetailCompo.jsx";
import Footer from "../components/Footer.jsx";


function SellerDetail() {
  return (
    <>
            <DynamicMeta />
            <Header />
            <SellerDetailCompo />
            <Footer />
    </>
  );
}

export default SellerDetail;
