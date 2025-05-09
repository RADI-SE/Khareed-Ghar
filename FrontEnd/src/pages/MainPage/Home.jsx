import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoSection from "../../components/Common/InfoSection";
import ProductsOnHomePage from "./ProductsOnHomePage";
import AuctionBanner from "../../components/Common/AuctionBanner";

const api = axios.create({
  baseURL: 'http://localhost:5000/api/carousel',
  withCredentials: true
});

const Home = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await axios.get("/api/carousel");
        
        // Ensure we have valid data
        if (!response.data) {
          console.warn("No data received from carousel endpoint");
          return;
        }

        // Handle different response formats
        let images = [];
        if (Array.isArray(response.data)) {
          images = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          images = response.data.data;
        } else if (response.data.images && Array.isArray(response.data.images)) {
          images = response.data.images;
        } else {
          console.warn("Unexpected carousel data format:", response.data);
          return;
        }

        // Filter active images and sort by order
        const activeImages = images
          .filter(item => item && item.active !== false)
          .sort((a, b) => (a.order || 0) - (b.order || 0));

        setCarouselImages(activeImages);
      } catch (error) {
        console.error("Error fetching carousel images:", error);
        setCarouselImages([]); // Set empty array on error
      }
    };

    fetchCarouselImages();
  }, []);

  const nextSlide = () => {
    if (carouselImages.length > 1) {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }
  };

  const prevSlide = () => {
    if (carouselImages.length > 1) {
      setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    }
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (carouselImages.length > 1) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [carouselImages.length]);

  return (
    <>
      <div className="w-100 mt-2 px-3 md:px-16 lg:px-24">
        <div className="container w-100 mx-auto py-4 flex flex-col md:flex-row space-x-2">
          <div
            id="carouselExampleControls"
            className="relative w-full md:w-12/12 mt-8 md:mt-0 h-96"
          >
            {/* Carousel items */}
            <div className="relative overflow-hidden">
              {carouselImages.length > 0 ? (
                carouselImages.map((item, index) => (
                  <div
                    key={item._id || index}
                    className={`absolute w-full transition-transform duration-[600ms] ease-in-out ${
                      index === currentSlide ? "translate-x-0" : "translate-x-full"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title || `Slide ${index + 1}`}
                      className="h-80 w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full">
                      <h3 className="text-lg font-bold">{item.title || `Slide ${index + 1}`}</h3>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-80 w-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No carousel images available</p>
                </div>
              )}
            </div>

            {/* Carousel controls - prev item */}
            {carouselImages.length > 1 && (
              <button
                onClick={prevSlide}
                className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white transition-opacity duration-150 ease-in-out hover:text-white hover:no-underline hover:opacity-90 focus:text-white focus:no-underline focus:opacity-90"
                type="button"
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
                <span className="sr-only">Previous</span>
              </button>
            )}

            {/* Carousel controls - next item */}
            {carouselImages.length > 1 && (
              <button
                onClick={nextSlide}
                className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white transition-opacity duration-150 ease-in-out hover:text-white hover:no-underline hover:opacity-90 focus:text-white focus:no-underline focus:opacity-90"
                type="button"
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
                <span className="sr-only">Next</span>
              </button>
            )}
          </div>
        </div>

        <InfoSection />
        <AuctionBanner />
        <ProductsOnHomePage />
      </div>
    </>
  );
};

export default Home;