// import { useEffect, useState } from "react";
// import axios from "axios";


// const AuctionTable = ({ userId }) => {
//   const [auctions, setAuctions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  
//   useEffect(() => {
//     if (!userId) {
//       setError("Invalid user ID.");
//       setLoading(false);
//       return;
//     }
  
//     const fetchAuctions = async () => {
//       try {
//         console.log("Fetching auctions for user:", userId);
//         const response = await axios.get(`http://localhost:5000/api/${userId}`);
//         setAuctions(response.data.products);
//       } catch (err) {
//         console.error("Error fetching user auctions:", err.message);
//         setError("Failed to load auctions.");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchAuctions();
//   }, [userId]);
  
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Your Auctions</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : auctions.length === 0 ? (
//         <p>No auctions available.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 px-4 py-2">Title</th>
//                 <th className="border border-gray-300 px-4 py-2">Starting Bid</th>
//                 <th className="border border-gray-300 px-4 py-2">End Date</th>
//                 <th className="border border-gray-300 px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {auctions.map((auction) => (
//                 <tr key={auction.id} className="border border-gray-300">
//                   <td className="border border-gray-300 px-4 py-2">{auction.title}</td>
//                   <td className="border border-gray-300 px-4 py-2">${auction.startingBid}</td>
//                   <td className="border border-gray-300 px-4 py-2">{new Date(auction.endDate).toLocaleDateString()}</td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuctionTable;

import {useFetchUserAuction} from "../../../../hooks/seller/Auctions/useFetchUserAuction"

const AuctionTable = () => {


  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useFetchUserAuction(); // Fetch auctions using the hook

  const auctions = Array.isArray(data) ? data : data ? [data] : [];

  console.log("Auction", auctions)
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Auctions</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Error fetching auctions: {error.message}</p>
      ) : auctions?.length === 0 ? (
        <p>No auctions available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Product</th>
                <th className="border border-gray-300 px-4 py-2">Starting Bid</th>
                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                <th className="border border-gray-300 px-4 py-2">End Date</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {auctions?.map((auction) => (
                <tr key={auction.id} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{auction.productsName}</td>

                  <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
                    <img src={auction.productsImg} alt={auction.productsName} className="w-12 h-16 object-cover rounded-lg"/>
                  </td>

                  <td className="border border-gray-300 px-4 py-2">${auction.startingBid}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {auction.startTime}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {auction.endTime}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuctionTable;
