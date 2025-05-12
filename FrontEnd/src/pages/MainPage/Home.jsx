import React, { useEffect, useState } from "react";
import InfoSection from "../../components/Common/InfoSection";
import ProductsOnHomePage from "./ProductsOnHomePage";
import AuctionBanner from "../../components/Common/AuctionBanner";
import { useAdminService } from "../../services/adminServices";

const Home = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { fetchCarousels } = useAdminService();

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await fetchCarousels();

        if (!response || !Array.isArray(response)) {
          console.warn("Unexpected carousel data format:", response);
          return;
        }

        const activeImages = response
          .filter(item => item && item.active !== false)
          .sort((a, b) => (a.order || 0) - (b.order || 0));

        setCarouselImages(activeImages);
      } catch (error) {
        console.error("Error fetching carousel images:", error);
        setCarouselImages([]);
      }
    };

    fetchCarouselImages();
  }, []);

  const nextSlide = () => {
    if (carouselImages.length > 1) {
      setCurrentSlide(prev => (prev + 1) % carouselImages.length);
    }
  };

  const prevSlide = () => {
    if (carouselImages.length > 1) {
      setCurrentSlide(prev => (prev - 1 + carouselImages.length) % carouselImages.length);
    }
  };

  useEffect(() => {
    if (carouselImages.length > 1) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [carouselImages.length]);

  return (
    <div className="w-full mt-2 px-3 md:px-16 lg:px-24">
      <div className="container mx-auto py-4 flex flex-col md:flex-row space-x-2">
        <div className="relative w-full mt-8 md:mt-0 h-[300px] overflow-hidden">
          {/* Carousel items */}
          {carouselImages.length > 0 ? (
            carouselImages.map((item, index) => (
              <div
                key={item._id || index}
                className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={`/images/${item.image}`}
                  alt={item.title || `Slide ${index + 1}`}
                  className="h-80 w-full object-cover"
                />
                {/* <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full">
                  <h3 className="text-lg font-bold">{item.title || `Slide ${index + 1}`}</h3>
                </div> */}
              </div>
            ))
          ) : (
            <div className="h-80 w-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No carousel images available</p>
            </div>
          )}

          {/* Controls */}
          {carouselImages.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-0 bottom-0 z-20 flex w-[15%] items-center justify-center text-white hover:opacity-90"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-0 bottom-0 z-20 flex w-[15%] items-center justify-center text-white hover:opacity-90"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      <InfoSection />
      <AuctionBanner />
      <ProductsOnHomePage />
    </div>
  );
};

export default Home;
