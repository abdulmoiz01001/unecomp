import React from 'react'
import AboutUsComp from '@/components/AboutUsComp'
import Drawar from '@/components/DrawerComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'About Us',
  description:
    'Learn about UneComp – your trusted source for high-quality electronic components for MUET students and beyond.',
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