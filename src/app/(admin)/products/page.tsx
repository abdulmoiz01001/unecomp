// import React from 'react'
import ProductsComp from '@/components/adminComponents/ProductsComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Products",
};


const ProductsPage = () => {
  return <ProductsComp />
}

export default ProductsPage