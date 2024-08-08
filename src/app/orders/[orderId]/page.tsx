"use client";
import React , { useEffect  , useState} from 'react'

import Drawar from '@/components/DrawerComp'
import { useRouter } from 'next/router';
import SingleOrderDetails from '@/components/SingleOrderDetails';
import { usePathname } from 'next/navigation';

import type { Metadata } from "next";
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
  

// export async function generateMetadata(): Promise<Metadata> {
//     const pathname = usePathname();

//     const id: string = pathname.split('/').pop() || '';
  
//     console.log(id);
//     return {
//         title:`Orders - ${id} `
//     }
// }
const SingleOrderPage = () => {
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

      
        
    return (
        <>
            <Drawar />
        <SingleOrderDetails /> 
        </>
    )
}

export default SingleOrderPage