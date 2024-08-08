"use client"
import React from 'react'

const SingleOrderComp = () => {
  const order = {
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St, City, Country',
      // Add more user details as needed
    },
    product: 'T-shirt',
    date: '2024-05-28',
    details: 'Blue T-shirt with a logo print.',
    status: 'Delivered',
    price: 20,
  };
  return (
    <>
      <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      <div className="divide-y divide-gray-200">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">User Information</h3>
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 mb-2">
              <span className="text-gray-600">Name:</span>
              <span className="text-gray-800 ml-2">{order.user.name}</span>
            </div>
            <div className="w-full sm:w-1/2 mb-2">
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-800 ml-2">{order.user.email}</span>
            </div>
            <div className="w-full sm:w-1/2 mb-2">
              <span className="text-gray-600">Address:</span>
              <span className="text-gray-800 ml-2">{order.user.address}</span>
            </div>
            {/* Add more user details as needed */}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Order Information</h3>
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 mb-2">
              <span className="text-gray-600">Product:</span>
              <span className="text-gray-800 ml-2">{order.product}</span>
            </div>
            <div className="w-full sm:w-1/2 mb-2">
              <span className="text-gray-600">Date:</span>
              <span className="text-gray-800 ml-2">{order.date}</span>
            </div>
            <div className="w-full sm:w-1/2 mb-2">
              <span className="text-gray-600">Details:</span>
              <span className="text-gray-800 ml-2">{order.details}</span>
            </div>
            <div className="w-full sm:w-1/2 mb-2">
              <span className="text-gray-600">Status:</span>
              <span className="text-gray-800 ml-2">{order.status}</span>
            </div>
            <div className="w-full sm:w-1/2 mb-2">
              <span className="text-gray-600">Price:</span>
              <span className="text-gray-800 ml-2">${order.price}</span>
            </div>
            {/* Add more order details as needed */}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default SingleOrderComp