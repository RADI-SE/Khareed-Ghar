import React from 'react'

const OrderConfirmation = ({order}) => {
  return (
    <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
        <h2 className='text-2xl font-semibold mb-4'>Thank You for Shopping!</h2>
        <p> 
We appreciate your purchase and hope you enjoy it.
A confirmation email has been sent with your order details.

Need help? Contact our support team anytime.</p>
        <div className='w-[800px] mt-6 p-4 border rounded-lg bg-gray-100'>
            <h3 className='text-lg font-semibold mb-2'>Order Summary</h3>
            <p>Order Number: {order.orderNumber}</p>
            <div className='mt-4'>
                <h4 className='text-md font-semibold mb-2'>Shipping Information</h4>
                <p>{order.shippingInformation.name}</p>
                <p>{order.shippingInformation.address}</p>
                <p>{order.shippingInformation.city}</p>
            </div>
            <div className='mt-4'>
                <h4 className='text-md font-semibold mb-2'>Products Orders</h4>
                {order.products.map(product =>(
                    <div key={product.id} className='flex justify-between mt-2'>
                        <p>{product.name} x {product.quantity}</p>
                    </div>
                ))}
            </div>
            <div className='mt-4 flex'>
                <span>Total Price</span>
                <span className='ml-[100px] font-semibold text-green-500'>{order.totalPrice}</span>
            </div>
        </div>
        <div className='mt-6'>
            <button className='ml-4 bg-blue-900 rounded-md w-[250px] text-white py-2 px-4hover:bg-red-800'>
                Continue Shopping
            </button>
        </div>
    </div>
  )
}

export default OrderConfirmation


// import React from 'react';

// const OrderConfirmation = ({ order }) => {
//   return (
//     <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24">
//       <h2 className="text-2xl font-semibold mb-4">Thank you for shopping</h2>
//       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur enim minus quo, laborum, dolor pariatur.</p>
//       <div className="mt-6 p-4 border rounded-lg bg-gray-100">
//         <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
//         <p>Order Number: {order.orderNumber}</p>
//         <div className="mt-4">
//           <h4 className="text-md font-semibold mb-2">Shipping Information</h4>
//           <p>{order.shippingInformation.name}</p>
//           <p>{order.shippingInformation.address}</p>
//           <p>{order.shippingInformation.city}</p>
//         </div>
//         <div className="mt-4">
//           <h4 className="text-md font-semibold mb-2">Products Ordered</h4>
//           {order.products.map((product) => (
//             <div key={product.id} className="flex justify-between mt-2">
//               <p>{product.name} x {product.quantity}</p>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-between">
//           <span>Total Price</span>
//           <span className="font-semibold">{order.totalPrice}</span>
//         </div>
//       </div>
//       <div className="mt-6">
//         <button className="ml-4 bg-blue-900 text-white py-2 px-4 hover:bg-red-800">
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmation;
