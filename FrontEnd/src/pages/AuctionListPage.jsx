import AuctionCard from "../components/Common/AuctionCard"
import { useFetchAuctions } from "../hooks/seller/Auctions/useFetchAuctions";

const AuctionListPage = () => {
  const {
    data: auctions = [],
    isLoading: isLoadingAuctions,
    isError: auctionsError,
  } = useFetchAuctions();


  if (isLoadingAuctions) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (auctionsError) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-red-600 text-lg">Error fetching auctions. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Active Auctions
        </h2>
        {auctions.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No active auctions available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {auctions.map((auction) => (
              <AuctionCard key={auction._id} auctions={auction} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AuctionListPage;
