import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Filter } from 'lucide-react';
// import { useAuctions, Auction } from '../context/AuctionContext';
// import SearchBar from '../components/SearchBar';
// import AuctionCard from '../components/AuctionCard';

const AuctionListPage = () => {
//   const { auctions } = useAuctions();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [filteredAuctions, setFilteredAuctions] = useState<Auction[]>([]);
//   const [statusFilter, setStatusFilter] = useState<string>('active');
//   const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Get category from URL if present
//   const categoryParam = searchParams.get('category') || '';
  
//   useEffect(() => {
    // let filtered = [...auctions];
    
    // Apply status filter
    // if (statusFilter !== 'all') {
    //   filtered = filtered.filter(auction => auction.status === statusFilter);
    // }
    
    // Apply category filter if present
    // if (categoryParam) {
      // In a real app, you would have a category field on the auction
      // This is just a placeholder for demonstration
      // filtered = filtered.filter(auction => auction.category === categoryParam);
    // }
    
    // Apply search query if present
    // if (searchQuery) {
    //   const query = searchQuery.toLowerCase();
    //   filtered = filtered.filter(
        // auction => 
        //   auction.productName.toLowerCase().includes(query) || 
        //   auction.description.toLowerCase().includes(query)
//       );
//     }
    
//     setFilteredAuctions(filtered);
//   }, [auctions, statusFilter, categoryParam, searchQuery]);
  
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };
  
//   const handleStatusChange = (status: string) => {
//     setStatusFilter(status);
//   };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">SS
          {/* {categoryParam 
            ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Auctions` 
            : 'All Auctions'} */}
        </h1>
        <div className="mt-4 md:mt-0">SS
          {/* <SearchBar onSearch={handleSearch} /> */}
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
        <div className="flex items-center space-x-2 mb-4">
          {/* <Filter className="h-5 w-5 text-gray-500" /> */}SSS
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            // onClick={() => handleStatusChange('all')}
            // className={`px-4 py-2 rounded-full text-sm font-medium ${
            //   statusFilter === 'all'
            //     ? 'bg-indigo-100 text-indigo-800'
            //     : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            // }`}
          >
            All
          </button>
          <button
            // onClick={() => handleStatusChange('active')}
            // className={`px-4 py-2 rounded-full text-sm font-medium ${
            //   statusFilter === 'active'
            //     ? 'bg-indigo-100 text-indigo-800'
            //     : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            // }`}
          >
            Active
          </button>
          <button
            // onClick={() => handleStatusChange('upcoming')}
            // className={`px-4 py-2 rounded-full text-sm font-medium ${
            //   statusFilter === 'upcoming'
            //     ? 'bg-indigo-100 text-indigo-800'
            //     : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            // }`}
          >
            Upcoming
          </button>
          <button
            // onClick={() => handleStatusChange('completed')}
            // className={`px-4 py-2 rounded-full text-sm font-medium ${
            //   statusFilter === 'completed'
            //     ? 'bg-indigo-100 text-indigo-800'
            //     : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            // }`}
          >
            Completed
          </button>
        </div>
      </div>
      
      {/* Results */}
      {/* {filteredAuctions.length === 0 ? ( */}
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No auctions found</h3>
          <p className="text-gray-500">
            Try adjusting your filters or search query to find what you're looking for.
          </p>
        </div>
      {/* ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAuctions.map(auction => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default AuctionListPage;