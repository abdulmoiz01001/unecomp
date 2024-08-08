import React from 'react'
import DeliveryDetailsComp from '@/components/DeliveryDetailsComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Delivery Details",
};

const DeliveryDetailsPage = () => {
  return (
    <>
    <DeliveryDetailsComp />
    </>
  )
}

export default DeliveryDetailsPage