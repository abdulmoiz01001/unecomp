// import React from 'react'
import UsersOrdersComp from '@/components/adminComponents/UserOrdersComp' // Add missing import statement
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Users Orders",
};

const UsersOrders = () => {
  return <UsersOrdersComp />;
}

export default UsersOrders;