// import React, { useState } from 'react';
// import MobileData from '../components/MobileData'

// // Define separate page components
// const Page1 = () => <div><h1>This is Page 1</h1></div>;
// const Page2 = () => <div><h1>This is Page 2</h1></div>;
// const Page3 = () => <div><h1>This is Page 3</h1></div>;
// const Page4 = () => <div><h1>This is Page 4</h1></div>;

// const ProductsOnHomePage = () => {
//   const [currentPage, setCurrentPage] = useState(1);  // State to keep track of the current page

//   const renderPage = () => {
//     switch (currentPage) {
//       case 1:
//         return <Page1 />;
//       case 2:
//         return <Page2 />;
//       case 3:
//         return <Page3 />;
//       case 4:
//         return <Page4 />;
//       default:
//         return <Page1 />;
//     }
//   };

//   return (
//     <div>
//       {/* Buttons to navigate between pages */}
//       <div>
//         <button onClick={() => setCurrentPage(1)}>Page 1</button>
//         <button onClick={() => setCurrentPage(2)}>Page 2</button>
//         <button onClick={() => setCurrentPage(3)}>Page 3</button>
//         <button onClick={() => setCurrentPage(4)}>Page 4</button>
//       </div>

//       {/* Render the selected page */}
//       <div>
//         {renderPage()}
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
// import '../../public/products.json'
// Assume products.json is in the same directory
import productsData from "../../../public/products.json";
import ProductCard from "../../components/Common/ProductCard";

const ProductsOnHomePage = () => {
  const [mobiles, setMobiles] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [tablets, setTablets] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = () => {
      // Filter products for electronics and limit to 2
      const mobileProducts = productsData.filter((product) => product.category === "Mobile").slice(0, 5); // Limit to 2 electronics

      // Filter products for clothing and limit to 2
      const laptopProducts = productsData
        .filter((product) => product.category === "Laptop")
        .slice(0, 5); // Limit to 2 clothing

      const tabletProducts = productsData
        .filter((product) => product.category === "Tablet")
        .slice(0, 5); // Limit to 2 clothing

      // Set the state
      setMobiles(mobileProducts);
      setLaptops(laptopProducts);
      setTablets(tabletProducts);
    };

    fetchProducts();
  }, []); // Empty array to run effect once

  return (
    <>
      <div className="container mx-auto py-12">
        <h2 className="mx-2xl font-bold mb-6 text-center ">
          Best Mobile Deals!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {mobiles.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>

      <div className="container mx-auto py-12">
        <h2 className="mx-2xl font-bold mb-6 text-center ">
          Best Laptop Deals!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {laptops.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>

      <div className="container mx-auto py-12">
        <h2 className="mx-2xl font-bold mb-6 text-center ">
          Best Tablets Deals!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tablets.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsOnHomePage;
