import React from 'react'
import OurMissionComp from '@/components/OurMissionComp'
import Drawar from '@/components/DrawerComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Our Mission",
 description:
    'At UneComp, our mission is to empower students and makers with high-quality, affordable electronic components. Learn more about our vision and values.',
};

const OurMission = () => {
  return (
    <>
      <Drawar />
    <OurMissionComp />
    </>
  )
}

export default OurMission