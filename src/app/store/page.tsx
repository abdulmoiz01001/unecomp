import React from 'react'
import StoreComp from '@/components/StoreComp'
import Drawar from '@/components/DrawerComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Store",
};

const StorePage = () => {
  return (
    <>
        <Drawar />
    <StoreComp />
    </>
  )
}

export default StorePage