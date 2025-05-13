import React from "react";
import defaultProduct from "../../assets/images/default.jpeg";
import { useNavigate } from "react-router-dom";

const AuctionCard = ({ auctions }) => {
  const navigate = useNavigate();

  const handleDetail = (e, auctionId) => {
    e.preventDefault();
    navigate(`/auction/${auctionId}`);
  };
  console.log("eMessage Auction", auctions);

//   {
//     "specifications": {
//         "capacity": "256GB",
//         "color": "Black",
//         "condition": "Used"
//     },
//     "_id": "6815c87db4dcf0eabe99a938",
//     "name": "Iphone 15 Pro Max",
//     "description": "Good Mobile but expensive",
//     "price": 450,
//     "isAuction": true,
//     "category": "674f9d1ca625626a2353c332",
//     "subcategory": "680396ea22cfe38489ffdd4b",
//     "seller": "680ff23bf8c2f1f713ac8082",
//     "images": [
//         "/uploads/1746258044907-403171175-I15.jpeg"
//     ],
//     "createdAt": "2025-05-03T07:40:45.050Z",
//     "updatedAt": "2025-05-03T07:40:45.050Z",
//     "__v": 0
// }
console.log("Auctionss", auctions);


  return (
  <>
    {auctions?.productId ? (
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={auctions?.productId?.images?.[0] ? `/public/images/${auctions.productId.images[0]}` : defaultProduct}
            alt={auctions?.productId?.name || "Auction Item"}
            className="w-full h-56 object-cover"
          />
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
              auctions?.status === "ongoing" ? "bg-green-600 text-white" : "bg-gray-400 text-white"
            }`}
          >
            {auctions?.status === "ongoing" ? "Active" : "Inactive"}
          </div>
        </div>
        <div className="px-5 py-4 space-y-2 text-center">
          <h3 className="text-lg font-semibold text-gray-800">{auctions?.productId?.name || "Auction Item"}</h3>
          <p className="text-gray-600">Current Bid: ${auctions?.currentPrice || auctions?.startingPrice}</p>
          <button
            onClick={(e) => handleDetail(e, auctions._id)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    ) : auctions?.products?._id  ? (
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={auctions?.products?.images?.[0] ? `/public/images/${auctions?.products?.images[0]}` : defaultProduct}
            alt={auctions?.products?.name || "Auction Item"}
            className="w-full h-56 object-cover"
          />
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
              auctions?.status === "ongoing" ? "bg-green-600 text-white" : "bg-gray-400 text-white"
            }`}
          >
            {auctions?.status === "ongoing" ? "Active" : "Inactive"}
          </div>
        </div>
        <div className="px-5 py-4 space-y-2 text-center">
          <h3 className="text-lg font-semibold text-gray-800">{auctions?.products?.name || "Auction Item"}</h3>
          <p className="text-gray-600">Current Bid: ${auctions?.products?.currentPrice || auctions?.startingPrice}</p>
          <button
            onClick={(e) => handleDetail(e, auctions._id)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    ) : null}
  </>
);
};

export default AuctionCard;


// {
//     "message": "Auctions found",
//     "auction": [
//         {
//             "_id": "681d9eecb4bb6553bc08b143",
//             "productId": "681d9ee9b4bb6553bc08b126",
//             "sellerId": "67322fc629f3c194f356342a",
//             "startingBid": 500,
//             "currentBid": 70000000000,
//             "currentBidder": "67322fc629f3c194f356342a",
//             "startTime": "2025-05-09T07:41:00.000Z",
//             "endTime": "2025-05-10T07:41:00.000Z",
//             "status": "completed",
//             "auctionStatus": "pending",
//             "bidders": [
//                 {
//                     "userId": "67322fc629f3c194f356342a",
//                     "name": "seller",
//                     "bidAmount": 70000000000,
//                     "_id": "681da75f3ba7e3f149d54004",
//                     "bidTime": "2025-05-09T06:57:35.889Z"
//                 }
//             ],
//             "__v": 1
//         },
//         {
//             "_id": "681db8a81cbafd532cb0cf72",
//             "productId": "681db8a61cbafd532cb0cf4a",
//             "sellerId": "67322fc629f3c194f356342a",
//             "startingBid": 5544,
//             "currentBid": 5544,
//             "currentBidder": null,
//             "startTime": "2025-05-09T08:11:00.000Z",
//             "endTime": "2025-05-09T08:12:00.000Z",
//             "status": "completed",
//             "auctionStatus": "pending",
//             "bidders": [],
//             "__v": 0
//         },
//         {
//             "_id": "682380badda6364ad08feed6",
//             "productId": "682380b7dda6364ad08feec1",
//             "sellerId": "67322fc629f3c194f356342a",
//             "startingBid": 251,
//             "currentBid": 251,
//             "currentBidder": null,
//             "startTime": "2025-05-13T17:25:00.000Z",
//             "endTime": "2025-05-16T17:25:00.000Z",
//             "status": "ongoing",
//             "auctionStatus": "pending",
//             "bidders": [],
//             "__v": 0
//         }
//     ],
//     "products": [
//         {
//             "specifications": {
//                 "capacity": "64GB",
//                 "color": "Red",
//                 "condition": "New"
//             },
//             "_id": "681d9ee9b4bb6553bc08b126",
//             "name": "1",
//             "description": "1",
//             "price": 400,
//             "isAuction": true,
//             "category": "674f9d1ca625626a2353c332",
//             "subcategory": "680396ea22cfe38489ffdd4b",
//             "seller": "67322fc629f3c194f356342a",
//             "images": [
//                 "/uploads/1746771689244-418049831-th.jpg"
//             ],
//             "createdAt": "2025-05-09T06:21:29.616Z",
//             "updatedAt": "2025-05-09T06:21:29.616Z",
//             "__v": 0
//         },
//         {
//             "specifications": {
//                 "capacity": "64GB",
//                 "color": "Red",
//                 "condition": "New"
//             },
//             "_id": "681db8a61cbafd532cb0cf4a",
//             "name": "12a",
//             "description": "1a",
//             "price": 4000,
//             "isAuction": true,
//             "category": "674f9d1ca625626a2353c331",
//             "subcategory": "680395bc22cfe38489ffdaff",
//             "seller": "67322fc629f3c194f356342a",
//             "images": [
//                 "/uploads/1746778277775-834349399-th.jpg"
//             ],
//             "createdAt": "2025-05-09T08:11:18.060Z",
//             "updatedAt": "2025-05-09T08:11:18.060Z",
//             "__v": 0
//         },
//         {
//             "specifications": {
//                 "capacity": "128GB",
//                 "color": "Black",
//                 "condition": "Used"
//             },
//             "_id": "682380b7dda6364ad08feec1",
//             "name": "Samsung S 25 Ultra Pro",
//             "description": "a good mobile",
//             "price": 250,
//             "isAuction": true,
//             "category": "674f9d1ca625626a2353c332",
//             "subcategory": "6803978622cfe38489ffdedb",
//             "seller": "67322fc629f3c194f356342a",
//             "images": [
//                 "/uploads/1747157175755-572644961-S25 .jpg"
//             ],
//             "createdAt": "2025-05-13T17:26:15.883Z",
//             "updatedAt": "2025-05-13T17:26:15.883Z",
//             "__v": 0
//         }
//     ]
// }