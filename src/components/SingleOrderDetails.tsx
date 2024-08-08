"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import getOrderByIdAction from '@/actions/getOrderByIdAction';

interface CustomerDetails {
  namePrefix: string;
  firstName: string;
  lastName: string;
  deptName: string;
  email: string;
  phoneNumber: string;
  projectName: string;
  rollNumber: string;
}

interface ShippingAddress {
  address: string;
  city: string;
  country: string;
}

interface OrderItem {
  product: string;
  productImage: string;
  productName: string;
  productPrice: string;
  productQuantity: string;
  _id: string;
}

interface Order {
  _id: string;
  adminApprove: string;
  cashOnDelivery: boolean;
  createdAt: string;
  customerDetails: CustomerDetails;
  isDelivered: boolean;
  isPaid: boolean;
  orderDate: string;
  orderItems: OrderItem[];
  orderTime: string;
  shippingAddress: ShippingAddress;
  shippingPrice: string;
  totalPrice: string;
  updatedAt: string;
  user: string;
}

const SingleOrderDetails: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [spinner, setSpinner] = useState(true);

  const pathname = usePathname();

  const id: string = pathname.split('/').pop() || '';

  console.log(id);

  const fetchOrders = async (id: string) => {
    try {
      const res = await getOrderByIdAction(id);
      console.log(res)
      const data = res;
      setOrder(data);
      console.log(data);
      setSpinner(false);
    } catch (err) {
      console.log(err);
      setSpinner(false);
    }
  };

  useEffect(() => {
    fetchOrders(id);
  }, [id]);

  if (spinner) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>No order found</div>;
  }

  return (
    <div className="max-w-4xl mt-10  mx-auto p-4 border border-gray-300 rounded-lg shadow-lg">
      <div className="text-right text-sm text-gray-500 mb-4">
        <div>{new Date(order.orderDate).toLocaleDateString()}</div>
        <div>{order.orderTime}</div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/3">
          <img src={order.orderItems[0]?.productImage} alt="Order Image" className="w-full h-auto object-cover" />
        </div>
        <div className="w-2/3 pl-4">
          <h2 className="text-xl font-bold mb-2">Order Details</h2>
          <p className="text-sm mb-2"><strong>Name:</strong> {`${order.customerDetails.namePrefix} ${order.customerDetails.firstName} ${order.customerDetails.lastName}`}</p>
          <p className="text-sm mb-2"><strong>Email:</strong> {order.customerDetails.email}</p>
          <p className="text-sm mb-2"><strong>Phone Number:</strong> {order.customerDetails.phoneNumber}</p>
          <p className="text-sm mb-2"><strong>Project Name:</strong> {order.customerDetails.projectName}</p>
          <p className="text-sm mb-2"><strong>Roll Number:</strong> {order.customerDetails.rollNumber}</p>
          <p className="text-sm mb-2"><strong>Department:</strong> {order.customerDetails.deptName}</p>
          <p className="text-sm mb-2"><strong>Address:</strong> {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`}</p>
          <p className="text-sm mb-2"><strong>Total Price:</strong> {order.totalPrice}</p>
          <p className="text-sm mb-2"><strong>Shipping Price:</strong> {order.shippingPrice}</p>
          <p className="text-sm mb-2"><strong>Cash on Delivery:</strong> {order.cashOnDelivery ? 'Yes' : 'No'}</p>
          <p className="text-sm mb-2"><strong>Order Status:</strong> {order.adminApprove}</p>
          <p className="text-sm mb-2"><strong>Delivered:</strong> {order.isDelivered ? 'Yes' : 'No'}</p>
          <p className="text-sm mb-2"><strong>Paid:</strong> {order.isPaid ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Order Items</h2>
        <ul>
          {order.orderItems.map(item => (
            <li key={item._id} className="mb-4">
              <div className="flex items-center">
                <div className="w-1/4">
                  <img src={item.productImage} alt={item.productName} className="w-full h-auto object-cover" />
                </div>
                <div className="w-3/4 pl-4">
                  <p className="text-sm mb-2"><strong>Product Name:</strong> {item.productName}</p>
                  <p className="text-sm mb-2"><strong>Product Price:</strong> {item.productPrice}</p>
                  <p className="text-sm mb-2"><strong>Product Quantity:</strong> {item.productQuantity}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleOrderDetails;
