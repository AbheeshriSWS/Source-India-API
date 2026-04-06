import Header from "../components/Header";
import Hero from "../components/Hero";
import LatestProduct from "../components/LatestProduct";
import Component from "../components/Component";
import Featured from "../components/Featured";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
            <Header />
            <Hero />
            <LatestProduct />
            <Component />
            <Featured />
            <Footer />
    </>
  );
}

export default Home;
