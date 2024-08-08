import React from 'react'
import OrdersComp from '@/components/OrdersComp'
import Drawar from '@/components/DrawerComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Orders",
};
const OrderPage = () => {
  return (
   <>
       <Drawar />
   <OrdersComp />
   </>
  )
}

export default OrderPage