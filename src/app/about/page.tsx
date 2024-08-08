import React from 'react'
import AboutUsComp from '@/components/AboutUsComp'
import Drawar from '@/components/DrawerComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
};

const AboutUsPage = () => {
  return (
    <>
        <Drawar />
    <AboutUsComp />
    </>
  )
}

export default AboutUsPage