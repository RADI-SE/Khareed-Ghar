import React from "react";

const SellerStore = ({ storeName, tagline, products }) => {
  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="p-6 font-sans">
      {/* Store Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{storeName}</h1>
        <p className="text-lg text-gray-500">{tagline}</p>
      </header>

      {/* Product Categories */}
      <div className="flex flex-wrap gap-6">
        {Object.keys(groupedProducts).map(
          (category) =>
            groupedProducts[category].length > 0 && (
              <div
                key={category}
                className="w-full md:w-[48%] bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedProducts[category].map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                      <h3 className="text-lg font-medium text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-gray-600">${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default SellerStore;