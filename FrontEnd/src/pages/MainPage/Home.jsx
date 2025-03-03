import React from "react"; 
import BannerImg from "../../assets/images/cart.jpg";
import InfoSection from "../../components/Common/InfoSection";
import ProductsOnHomePage from "./ProductsOnHomePage";
import AuctionBanner from "../../components/Common/AuctionBanner";
const Home = () => {
  return (
    <div className="w-100 mt-2 px-3 md:px-16 lg:px-24">
      <div className="container w-100 mx-auto py-4 flex flex-col md:flex-row space-x-2">
        <div className="w-full md:w-12/12 mt-8 md:mt-0 h-96 relative">
          <img src={BannerImg} alt="" className="h-80 w-full object-cover" />
          <div className="absolute top-16 left-8">
          </div>
        </div>
      </div>
      <InfoSection />
      <AuctionBanner />
      <ProductsOnHomePage />

      <div>
      </div>
    </div>
  );
};

export default Home;
