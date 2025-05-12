import React from "react";
import { FaExchangeAlt, FaGavel, FaShoppingCart } from "react-icons/fa";
const InfoSection = () => {
  const infoItems = [
    {
      icon: <FaShoppingCart className="text-3xl text-[#FFD700]" />,
      title: "Buy-Sell",
      description: "Buy and Sell with ease, through our platform!",
    },
    {
      icon: <FaGavel className="text-3xl text-[#FFD700]" />,
      title: "Auction",
      description:
        "Place your bid, compete for exclusive items, and win today!",
    },
    {
      icon: <FaExchangeAlt className="text-3xl text-[#FFD700]" />,
      title: "Consignment Selling",
      description:
        "Sell your items through consignment, reach buyers, and earn profits!",
    },
  ];

  return (
    <div className="w-100 mx-auto pb-8 pt-12 flex justify-center items-center hidden lg:block md:block">
      <div className="container w-100 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {infoItems.map((items, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center text-center p-4 border rounded-lg shadow-md transform transition-transform duration-300 "
          >
            {items.icon}
            <h3 className="mt-4 text-xl font-semibold">{items.title}</h3>
            <p className="mt-2 text-grey-600">{items.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default InfoSection;
