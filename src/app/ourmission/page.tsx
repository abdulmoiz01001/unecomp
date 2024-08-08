import React from 'react'
import OurMissionComp from '@/components/OurMissionComp'
import Drawar from '@/components/DrawerComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Our Mission",
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