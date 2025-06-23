import TermsAndConditionsComp from '@/components/TermsAndConditionsComp'
import React from 'react'
import Drawar from '@/components/DrawerComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    'Explore our online store for top-quality electronic components including resistors, capacitors, transistors, and more. Ideal for students, engineers, and hobbyists in Pakistan.',
};
const TermsAndPolicies = () => {
  return (
            <>
            <Drawar />  
            <TermsAndConditionsComp />
            </>
  )
}

export default TermsAndPolicies