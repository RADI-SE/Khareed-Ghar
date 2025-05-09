import { useState } from "react";
import AuctionCard from "../components/Common/AuctionCard";
import { useFetchAuctions } from "../hooks/seller/Auctions/useFetchAuctions";

const AuctionListPage = () => {
  const [activeTab, setActiveTab] = useState("active");

  const {
    data: auctions = [],
    isLoading,
    isError,
  } = useFetchAuctions();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-red-600 text-lg font-medium">
          Error fetching auctions. Please try again later.
        </p>
      </div>
    );
  }
 
  const activeAuctions = auctions.filter((a) => a.status === "ongoing");
  const completedAuctions = auctions.filter((a) => a.status === "completed");
  

  const isActive = activeTab === "active";
  const filteredAuctions = isActive ? activeAuctions : completedAuctions;

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Tabs */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          className={`px-6 py-2 rounded-full font-medium transition ${
            isActive
              ? "bg-red-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active Auctions
        </button>
        <button
          className={`px-6 py-2 rounded-full font-medium transition ${
            !isActive
              ? "bg-red-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Auctions
        </button>
      </div>

      {/* Auction Cards */}
      {filteredAuctions.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-8">
          {isActive
            ? "No active auctions available at the moment."
            : "No completed auctions yet."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAuctions.map((auction) => (
            <AuctionCard key={auction._id} auctions={auction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuctionListPage;
