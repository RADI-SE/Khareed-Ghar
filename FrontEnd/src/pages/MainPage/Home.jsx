import React, { useEffect } from "react"; 
import {
  Carousel,
  initTWE,
} from "tw-elements";
import InfoSection from "../../components/Common/InfoSection";
import ProductsOnHomePage from "./ProductsOnHomePage";
import AuctionBanner from "../../components/Common/AuctionBanner";

import Slide1 from "../../assets/images/1.jpg";
import Slide2 from "../../assets/images/2.jpg";
import Slide3 from "../../assets/images/3.jpg";
import Slide4 from "../../assets/images/4.jpg";
import Slide5 from "../../assets/images/5.jpg";

const Home = () => {

  useEffect(() => {
    initTWE({ Carousel });
  }, []);
console.log("Home page loaded");
  return (
    
    <>
    <div className="w-100 mt-2 px-3 md:px-16 lg:px-24">
      <div className="container w-100 mx-auto py-4 flex flex-col md:flex-row space-x-2">
      
        <div
          id="carouselExampleControls"
          className="relative  w-full md:w-12/12 mt-8 md:mt-0 h-96"
          data-twe-carousel-init=""
          data-twe-ride="carousel"
        >
          {/*Carousel items*/}
          <div className="relative overflow-hidden after:clear-both after:block after:content-['']">
            {/*First item*/}
            <div
              className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
              data-twe-carousel-item=""
              data-twe-carousel-active=""
            >
              <h1>Suleman</h1>
              <img src={Slide1} alt="Slide 1" className="h-80 w-full object-cover" />
            </div>
            {/*Second item*/}
            <div
              className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
              data-twe-carousel-item=""
            >
              <img
                src={Slide2}
                className="h-80 w-full object-cover"
                alt="Camera"
              />
            </div>
            {/*Third item*/}
            <div
              className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
              data-twe-carousel-item="3"
            >
              <img
                src={Slide3}
                className="h-80 w-full object-cover"
                alt="Exotic Fruits"
              />
            </div>
            {/*Fourth item*/}
            <div
              className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
              data-twe-carousel-item="3"
            >
              <img
                src={Slide4}
                className="h-80 w-full object-cover"
                alt="Exotic Fruits"
              />
            </div>
            {/*Fifth item*/}
            <div
              className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
              data-twe-carousel-item="3"
            >
              <img
                src={Slide5}
                className="h-80 w-full object-cover"
                alt="Exotic Fruits"
              />
            </div>
          </div>
          {/*Carousel controls - prev item*/}
          <button
            className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            data-twe-target="#carouselExampleControls"
            data-twe-slide="prev"
          >
            <span className="inline-block h-8 w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Previous
            </span>
          </button>
          {/*Carousel controls - next item*/}
          <button
            className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            data-twe-target="#carouselExampleControls"
            data-twe-slide="next"
          >
            <span className="inline-block h-8 w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Next
            </span>
          </button>
        </div>



      </div>
      <InfoSection />
      <AuctionBanner />
      <ProductsOnHomePage />

      <div>
      </div>
    </div>
    </>
  );
};

export default Home;
