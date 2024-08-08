import React from 'react'
import ContactUsComp from '@/components/ContactUsComp'
import Drawar from '@/components/DrawerComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact",
};
const ContactUsPage = () => {
  return (
    <>
        <Drawar />
    <ContactUsComp />
    </>
  )
}

export default ContactUsPage