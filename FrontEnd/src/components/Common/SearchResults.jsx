import React from "react";
import { useLocation } from "react-router-dom";
import { useBuyerService } from "../../services/buyer/buyerServices";
import { useEffect, useState } from "react";

const SearchResults = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchProduct } = useBuyerService();
  console.log(query);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await searchProduct(query);
        setResults(res?.products || []);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <img
                src={`../../../../../public/images${product.images[0]}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 font-medium mt-1">Rs. {product.price}</p>
                <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                <div className="mt-2">
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">
                    {product.category}
                  </span>
                </div>
                {product.seller && (
                  <p className="text-sm text-gray-500 mt-1">Seller: {product.seller.name}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
