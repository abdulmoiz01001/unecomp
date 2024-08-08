"use client"
import React, { useEffect, useState } from 'react'
import DashboardSidebarComp from './DashboardSidebar'
import DashboardHeader from './dashboardHeader'

const UserOrders = () => {

   const [ orders, setOrders ] = useState([]) as any[];

   const fetchOrders = async () => {
    
    const res =  await fetch(`/api/orders`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    
    })

    if(!res.ok){
      console.error('Failed to fetch orders');
      return;
    }

    const data = await res.json();

    console.log('Orders:', data);

    setOrders(data);

  }

  const acceptOrder = async (index : number) => {
    try{

      orders[index].adminApprove = "Your Order is Approved it will be delivered soon.";
    console.log('Accept Order', orders[index]);

    
    
    const res =  await fetch(`/api/orders`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orders[index])
    })

    if(!res.ok){
      console.error('Failed to fetch orders');
      return;
    }
  
  const data = await res.json();

console.log('Orders:', data);
fetchOrders();
} catch (error) {
  console.error('Error:', error);
}
  }

  const rejectOrder = async (index : number) => {
    try{

      orders[index].adminApprove = "Your Order is not Approved due to unavailable Stock.";
    console.log('Reject Order' , orders[index]);
  const res =  await fetch(`/api/orders`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orders[index])
    
    })

    if(!res.ok){
      console.error('Failed to fetch orders');
      return;
    }

    const data = await res.json();

  console.log('Orders:', data);

fetchOrders();
} catch (error) {
  console.error('Error:', error);
}
}




  useEffect(() => {
      fetchOrders();
  }, [])

  const DeliverOrder = async (index : number) => {
    try{

      orders[index].isDelivered = true;
      orders[index].isPaid = true;
    console.log('Deliver Order' , orders[index]); 
    const res =  await fetch(`/api/orders`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orders[index])
    
    })

    if(!res.ok){
      console.error('Failed to fetch orders');
      return;
    }

    const data = await res.json();

  console.log('Orders:', data);

fetchOrders();

} catch (error) {

  console.error('Error:', error);

}

  }







  return (
    <>
   
    
   
    <div className='w-[100vw] min-h-[90vh] flex flex-col justify-between items-start '>
  
   
  <DashboardHeader onOpen={()=>{}} />
  <div className='w-full h-[90vh] flex justify-between items-start '>
  <DashboardSidebarComp />
  <div className='w-full bg-gray-100 min-h-[100vh] flex flex-col justify-center items-start '>
  <div className='w-full flex bg-gray-100  justify-evenly flex-wrap items-center h-[90%] border-2 '>

    {orders.map((order : any, index : number) => (
    <div key={index} className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <div className="p-6 bg-blue-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Order Details</h2>
            <p className="text-gray-700"><span className="font-semibold">Order ID:</span> {order._id}</p>
            <p className="text-gray-700"><span className="font-semibold">Order Date:</span> {new Date(order.orderDate).toLocaleDateString()}</p>
            <p className="text-gray-700"><span className="font-semibold">Order Time:</span> {order.orderTime}</p>
            <p className="text-gray-700"><span className="font-semibold">Total Price:</span> RS-{order.totalPrice}</p>
          </div>
          <div className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Details</h3>
            <p className="text-gray-600"><span className="font-semibold">Name:</span> {order.customerDetails.namePrefix} {order.customerDetails.firstName} {order.customerDetails.lastName}</p>
            <p className="text-gray-600"><span className="font-semibold">Email:</span> {order.customerDetails.email}</p>
            <p className="text-gray-600"><span className="font-semibold">Phone:</span> {order.customerDetails.phoneNumber}</p>
            <p className="text-gray-600"><span className="font-semibold">Department:</span> {order.customerDetails.deptName}</p>
            <p className="text-gray-600"><span className="font-semibold">Project:</span> {order.customerDetails.projectName}</p>
            <p className="text-gray-600"><span className="font-semibold">Roll Number:</span> {order.customerDetails.rollNumber}</p>
          </div>
          <div className="p-6 bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h3>
            <p className="text-gray-600"><span className="font-semibold">Address:</span> {order.shippingAddress.address}</p>
            <p className="text-gray-600"><span className="font-semibold">City:</span> {order.shippingAddress.city}</p>
            <p className="text-gray-600"><span className="font-semibold">Country:</span> {order.shippingAddress.country}</p>
          </div>
          <div className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
            {order.orderItems.map((item : any) => (
              <div key={item._id} className="flex items-center mb-4 bg-white p-4 shadow rounded">
                <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-cover rounded mr-4" />
                <div>
                  <p className="text-gray-800 font-semibold">{item.productName}</p>
                  <p className="text-gray-600">Price: RS-{item.productPrice}</p>
                  <p className="text-gray-600">Quantity: {item.productQuantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Info</h3>
            <p className="text-gray-700"><span className="font-semibold">Admin Approved:</span> {order.adminApprove}</p>
            <p className="text-gray-700"><span className="font-semibold">Cash on Delivery:</span> {order.cashOnDelivery ? 'Yes' : 'No'}</p>
            <p className="text-gray-700"><span className="font-semibold">Shipping Price:</span> RS-{order.shippingPrice}</p>
            <p className="text-gray-700"><span className="font-semibold">Is Paid:</span> {order.isPaid ? 'Yes' : 'No'}</p>
            <p className="text-gray-700"><span className="font-semibold">Is Delivered:</span> {order.isDelivered ? 'Yes' : 'No'}</p>
          </div>
          <div className="p-6 bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Accept / Reject</h3>

            <div className='w-full flex justify-evenly items-center'>
              <button onClick={()=> acceptOrder(index)} className="bg-green-500 text-white active:scale-95 px-4 py-2 rounded mr-2">Accept</button>
              <button onClick={()=> rejectOrder(index)} className="bg-red-500 text-white active:scale-95 px-4 py-2 rounded">Reject</button>
              <div className='w-[50%] flex justify-end items-center' >

              <button onClick={()=> DeliverOrder(index)} className="bg-yellow-500 text-white active:scale-95 px-4 py-2 rounded ml-2">Delivered</button>
              </div>
            </div>
           
          </div>
        </div>
    ))}
    </div>
  <div className='w-full h-[90%] border-2 '>

  </div>
  </div>
  </div>
  </div>
    </>
  )
}

export default UserOrders