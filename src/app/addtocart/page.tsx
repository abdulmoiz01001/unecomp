import React from 'react'
import AddToCartComp from '@/components/AddToCartComp'
import Drawar from '@/components/DrawerComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
};
const AddToCart = () => {
  return (
   <>
       <Drawar />
   <AddToCartComp />
   </>
  )
}

export default AddToCart