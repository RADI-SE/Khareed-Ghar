import React, { useEffect } from "react";
import categoriesData from "../../../public/Categories.json";
import BannerImg from "../../assets/images/cart.jpg";
import InfoSection from "../../components/Common/InfoSection";
import ProductsOnHomePage from "../../pages/MainPage/ProductsOnHomePage";
import { setProducts } from "../../slices/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import mockData from "../../../public/products.json";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProducts(mockData));
  }, [dispatch]);

  const categories = categoriesData[0].categories.split(",");
  return (
    <div className="w-100 mt-2 px-3 md:px-16 lg:px-24">
      <div className="container w-100 mx-auto py-4 flex flex-col md:flex-row space-x-2">
        <div className="w-full md:w-12/12 mt-8 md:mt-0 h-96 relative">
          <img src={BannerImg} alt="" className="h-80 w-full object-cover" />
          <div className="absolute top-16 left-8">
            <p className="text-2xl text-white mb-4 font-semibold">
              Best Deals!
            </p>
            <h2 className="text-4xl text-white font-bold">Khareed-Ghar</h2>
            <button className="font-semibold bg-blue-900  rounded text-white px-8 py-1.5 text-white mt-4 hover:bg-red-700 transform transition-transform duration-300 hover:scale-105">
              Let's Go
            </button>
          </div>
        </div>
      </div>
      <InfoSection />
      <ProductsOnHomePage />

      <div>
      </div>
    </div>
  );
};

export default Home;
