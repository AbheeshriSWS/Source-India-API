import DynamicMeta from "../components/DynamicMeta.jsx";
import Header from "../components/Header.jsx";
import SellerPage from "../components/SellerLisstingCompo.jsx";
import Footer from "../components/Footer.jsx";


function SellerListing() {
  return (
    <>
            <DynamicMeta />
            <Header />
            <SellerPage />
            <Footer />
    </>
  );
}

export default SellerListing;
