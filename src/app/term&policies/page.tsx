import TermsAndConditionsComp from '@/components/TermsAndConditionsComp'
import React from 'react'
import Drawar from '@/components/DrawerComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms & Conditions",
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