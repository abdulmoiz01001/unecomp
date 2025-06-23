import React from 'react'
import StoreComp from '@/components/StoreComp'
import Drawar from '@/components/DrawerComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Store',
  description:
    'Explore a wide range of top-quality electronic components at UneComp. Shop resistors, capacitors, transistors, and more — perfect for students, engineers, and hobbyists in Pakistan.',
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