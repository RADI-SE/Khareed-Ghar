import React from 'react'
// import { useFetchNotifications } from '../../../hooks/seller/Notifications/useFetchNotifications'
// import { Link } from 'react-router-dom'
// import { useSellerService } from '../../../services/seller/sellerServices'


function Notifications() {
  //   const {updateNotification} = useSellerService();
  // const { data = [], isLoading, isError } = useFetchNotifications();

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <p className="text-red-500">Error loading notifications</p>
  //     </div>
  //   );
  // }


  // const handleUpdateNotification = async (id) => {
  //   const read = true;
  //   await updateNotification(id, read);
  // };





//   [
//     {
//         "_id": "67faa5b262b1750e086029ea",
//         "receipient": "67322fc629f3c194f356342a",
//         "auction": "67f44ee50c7939487ab0383a",
//         "message": "Razi placed a new bid of $930",
//         "read": false,
//         "readAt": null,
//         "link": "/auction/67f44ee50c7939487ab0383a",
//         "createdAt": "2025-04-12T17:41:06.308Z",
//         "updatedAt": "2025-04-12T17:41:06.308Z",
//         "__v": 0
//     },
//     {
//         "_id": "67fb50edeb183b2635f41634",
//         "receipient": "67322fc629f3c194f356342a",
//         "order": "67fb50edeb183b2635f4162f",
//         "message": "6732321729f3c194f3563432 placed a new order of 1 6",
//         "read": false,
//         "readAt": null,
//         "link": "/order/67fb50edeb183b2635f4162f",
//         "createdAt": "2025-04-13T05:51:42.202Z",
//         "updatedAt": "2025-04-13T05:51:42.202Z",
//         "__v": 0
//     },
//     {
//         "_id": "67fbcb87fde081d5e86c0a82",
//         "receipient": "67322fc629f3c194f356342a",
//         "auction": "67f447b3b4c0393811c92106",
//         "message": "seller placed a new bid of $501",
//         "read": false,
//         "readAt": null,
//         "link": "/auction/67f447b3b4c0393811c92106",
//         "createdAt": "2025-04-13T14:34:47.099Z",
//         "updatedAt": "2025-04-13T14:34:47.099Z",
//         "__v": 0
//     },
//     {
//         "_id": "67fbd261fc1153c330572fcc",
//         "receipient": "67322fc629f3c194f356342a",
//         "auction": "67fbd247fc1153c330572f12",
//         "message": "seller placed a new bid of $501",
//         "read": false,
//         "readAt": null,
//         "link": "/auction/67fbd247fc1153c330572f12",
//         "createdAt": "2025-04-13T15:04:01.392Z",
//         "updatedAt": "2025-04-13T15:04:01.392Z",
//         "__v": 0
//     },
//     {
//         "_id": "67fbd3ac9af96b9095848083",
//         "receipient": "67322fc629f3c194f356342a",
//         "auction": "67fbd247fc1153c330572f12",
//         "message": "seller placed a new bid of $502",
//         "read": false,
//         "readAt": null,
//         "link": "/auction/67fbd247fc1153c330572f12",
//         "createdAt": "2025-04-13T15:09:32.405Z",
//         "updatedAt": "2025-04-13T15:09:32.405Z",
//         "__v": 0
//     },
//     {
//         "_id": "67fcd2f1e09b67832a2efc8a",
//         "receipient": "67322fc629f3c194f356342a",
//         "auction": "67fbd247fc1153c330572f12",
//         "message": "seller placed a new bid of $505",
//         "read": false,
//         "readAt": null,
//         "link": "/auction/67fbd247fc1153c330572f12",
//         "createdAt": "2025-04-14T09:18:41.319Z",
//         "updatedAt": "2025-04-14T09:18:41.319Z",
//         "__v": 0
//     },
//     {
//         "_id": "67fcd375e09b67832a2f0190",
//         "receipient": "67322fc629f3c194f356342a",
//         "auction": "67fbd247fc1153c330572f12",
//         "message": "seller placed a new bid of $506",
//         "read": false,
//         "readAt": null,
//         "link": "/auction/67fbd247fc1153c330572f12",
//         "createdAt": "2025-04-14T09:20:53.941Z",
//         "updatedAt": "2025-04-14T09:20:53.941Z",
//         "__v": 0
//     },
//     {
//         "_id": "67fcd88376a66006e4956bb6",
//         "receipient": "67322fc629f3c194f356342a",
//         "auction": "67f44ee50c7939487ab0383a",
//         "message": "seller placed a new bid of $931",
//         "read": false,
//         "readAt": null,
//         "link": "/auction/67f44ee50c7939487ab0383a",
//         "createdAt": "2025-04-14T09:42:27.307Z",
//         "updatedAt": "2025-04-14T09:42:27.307Z",
//         "__v": 0
//     },
//     {
//         "_id": "67fcd9e476a66006e49573e4",
//         "receipient": "67322fc629f3c194f356342a",
//         "auction": "67f44ee50c7939487ab0383a",
//         "message": "seller placed a new bid of $932",
//         "read": false,
//         "readAt": null,
//         "link": "/auction/67f44ee50c7939487ab0383a",
//         "createdAt": "2025-04-14T09:48:20.310Z",
//         "updatedAt": "2025-04-14T09:48:20.310Z",
//         "__v": 0
//     },
//     {
//         "_id": "67fcda1c76a66006e4957533",
//         "receipient": "67322fc629f3c194f356342a",
//         "auction": "67f44ee50c7939487ab0383a",
//         "message": "seller placed a new bid of $933",
//         "read": false,
//         "readAt": null,
//         "link": "/auction/67f44ee50c7939487ab0383a",
//         "createdAt": "2025-04-14T09:49:16.183Z",
//         "updatedAt": "2025-04-14T09:49:16.183Z",
//         "__v": 0
//     },
//     {
//         "_id": "67fd04f23f6bd3ecc9fefa5a",
//         "receipient": "67322fc629f3c194f356342a",
//         "auction": "67fd04d83f6bd3ecc9fef9bf",
//         "message": "seller placed a new bid of $2000",
//         "read": false,
//         "readAt": null,
//         "link": "/auction/67fd04d83f6bd3ecc9fef9bf",
//         "createdAt": "2025-04-14T12:52:02.585Z",
//         "updatedAt": "2025-04-14T12:52:02.585Z",
//         "__v": 0
//     },
//     {
//         "_id": "67fec33b8b0dc9e336c651dd",
//         "receipient": "67322fc629f3c194f356342a",
//         "auction": "67f44ee50c7939487ab0383a",
//         "message": "seller placed a new bid of $934",
//         "read": false,
//         "readAt": null,
//         "link": "/auction/67f44ee50c7939487ab0383a",
//         "createdAt": "2025-04-15T20:36:11.781Z",
//         "updatedAt": "2025-04-15T20:36:11.781Z",
//         "__v": 0
//     }
// ]

  return (
    <div className="max-w-2xl mx-auto p-4">

      {/* {data.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((notification) => (
            <Link
              onClick={() => handleUpdateNotification(notification?._id)}
            //   to={`/seller`}
              key={notification?._id}
              className={`block p-4 rounded-lg transition-all duration-200 no-underline ${
                notification?.read
                  ? 'bg-gray-50 hover:bg-gray-100'
                  : 'bg-blue-50 hover:bg-blue-100'
              }`}
            >

                <div className='flex row justify-start items-start'>

                
              <div className="flex items-start">
                <div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{notification?.message}</p>
                  <p className="text-gray-800 font-medium">{notification?._id}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Time : {notification?.createdAt}
                  </p>

                </div>
                </div>
                
                {!notification?.read && (
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                )}
              </div>
              </div>
            </Link>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default Notifications;