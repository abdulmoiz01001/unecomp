"use client"
import Link from 'next/link';
import React, { useEffect , useState }  from 'react';
import sessionAction from '@/actions/sessionAction';
import Image from 'next/image';
import { Button, CircularProgress } from '@chakra-ui/react';
import { useAppDispatch } from '@/lib/store/hooks';
import { clearCartsData } from '@/lib/store/features/carts/cartsSlice';
import { clearData } from '@/lib/store/features/orders/ordersSlice';
import axios from 'axios';
import ordersAction from '@/actions/ordersAction';

interface CustomerDetails {
  namePrefix: string;
  firstName: string;
  lastName: string;
  deptName: string;
  email: string;
}

interface ShippingAddress {
  address: string;
  city: string;
  country: string;
}

interface OrderItem {
  productImage: string;
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

const OrdersComp = () => {

  const dispatch = useAppDispatch();

  const [orders, setOrders] = useState<Order[]>([]);
  const [ spinner , setSpinner] = useState(true)
  // const [userID, setUserID] = useState('')
  // let change = 0;



  const session = async () => {
    try {
      const res : any = await sessionAction();

        fetchOrders(res?.user._id);
        dispatch(clearCartsData())
        dispatch(clearData())
     



      console.log(res);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    session();
  }, []);

  const fetchOrders = async (userID : string) => {
    
    console.log('User ID:', userID);
   const res : any =  await ordersAction(userID);

  // const res = axios.get(`/api/orders?id=${userID}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // })

    // if(!res.data){
    //   console.error('Failed to fetch orders');
      setSpinner(false);
    //   return;
    // }

    const data = res;

    console.log('Orders:', data);
     
        setOrders(data);
    
  }

  const cancelOrder = async (id: string, userID : string) => {
    try {
      const res = await fetch(`/api/orders`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({_id: id, userID: userID})
      })
  
      if(!res.ok){
        console.error('Failed to fetch orders');
        return;
      }
    
      
    fetchOrders(userID);
    } catch (error) {
      console.error('Error:', error);
    }
  }





  // const orders = [
  //   {
  //     id: 1,
  //     product: 'T-shirt',
  //     date: '2024-05-28',
  //     details: 'Blue T-shirt with a logo print.',
  //     status: 'Delivered',
  //     price: 20,
  //   },
  //   {
  //     id: 2,
  //     product: 'Jeans',
  //     date: '2024-05-25',
  //     details: 'Black jeans, size 32.',
  //     status: 'In Transit',
  //     price: 30,
  //   },
  //   {
  //     id: 3,
  //     product: 'Sneakers',
  //     date: '2024-05-20',
  //     details: 'White sneakers, size 9.',
  //     status: 'Pending',
  //     price: 50,
  //   },
  // ];

  console.log('Orders:', orders);
  let sortedOrders : Order[] = [];
 if(orders.length > 0){
     sortedOrders = orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
 }
  return (
    <>

    <div className='w-[100vw] min-h-[100vh] flex xs:flex-col xxs:flex-col flex-row gap-8 px-2  justify-start items-center flex-wrap ' > 

    {
  
      orders.length === 0 || !orders.length  && (
        <div className='w-full h-full shadow-lg flex justify-center items-center' >
         {
          spinner ? <CircularProgress isIndeterminate color='green.300' /> :  <p className='shadow-xl p-8 text-center center'>No Orders Found</p>
         } 
         
        </div>
      )
    }
    {
      orders.length > 0 && <>
      {sortedOrders.map((order : any, index : number) => (
        order.orderItems.map((item : any, index : number) => (
        <div className="flex border xxs:w-[98%] xs:w-[98%] xxs:flex-col xs:flex-col sm:flex-col  sm:w-[98%] w-[46%] border-gray-300 rounded-lg overflow-hidden shadow-lg my-4">
        <div className="flex-none xxs:w-full xs:w-full sm:w-full  w-[30%] relative">
          <img src={item.productImage} alt="Order Image" className=" xss:mx-auto xs:mx-auto w-56 h-full xxs:h-56 xs:h-56 object-cover" />
        </div>
        <div className="flex-auto p-6 relative">
          <div className="absolute top-2 right-2 text-sm text-gray-500">
            <div>{new Date(order.orderDate).toLocaleDateString()}</div>
            <div>{order.orderTime}</div>
          </div>
          <div className=" text-sm mb-2"><strong>Name:</strong> {`${order.customerDetails.namePrefix} ${order.customerDetails.firstName} ${order.customerDetails.lastName}`}</div>
          <div className=" text-sm mb-2"><strong>Email:</strong> {order.customerDetails.email}</div>
          <div className=" text-sm mb-2"><strong>Address:</strong> {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`}</div>
          <div className=" text-sm mb-2"><strong>Total Price:</strong> {order.totalPrice}</div>
          <div className=" text-sm mb-2"><strong>Shipping Price:</strong> {order.shippingPrice}</div>
          <div className=" text-sm mb-2"><strong>Cash on Delivery:</strong> {order.cashOnDelivery ? 'Yes' : 'No'}</div>
          <div className=" text-sm mb-2"><strong>Order Status:</strong> {order.adminApprove}</div>
          <div className=" text-sm mb-2"><strong>Delivered:</strong> {order.isDelivered ? 'Yes' : 'No'}</div>
          <div className=" text-sm mb-2"><strong>Paid:</strong> {order.isPaid ? 'Yes' : 'No'}</div>
          <div className="flex justify-end">
            <Link href={`/orders/${order._id}`}>
              <Button colorScheme="green" size="sm" className="mr-2">View</Button>
            </Link>
            {
              order.adminApprove == 'Order will Approved as soon possible' && <Button colorScheme="red" size="sm" onClick={() => cancelOrder(order._id, order.user)}>Cancel</Button>
            }
            
          </div>
        </div>
      </div>
        ))
      ))}

      </>
    }
        </div>
    </>
  )
}

export default OrdersComp;
