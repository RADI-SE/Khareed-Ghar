import React from "react";
import { useLocation } from "react-router-dom";
import { useBuyerService } from "../../services/buyer/buyerServices";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const SearchResults = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");
    const type = new URLSearchParams(search).get("type")
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchProduct } = useBuyerService();
  console.log(query);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await searchProduct(query, type);
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
  }, [query, type]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((product) => (
            <div key={product._id} className="min-w-[200px] flex-shrink-0 sm:min-w-[250px]">
              <ProductCard product={product} />
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
