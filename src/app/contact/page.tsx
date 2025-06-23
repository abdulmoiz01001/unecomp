import React from 'react'
import ContactUsComp from '@/components/ContactUsComp'
import Drawar from '@/components/DrawerComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact",
 description:
    'Need help or have questions? Get in touch with UneComp for support, inquiries, or feedback. We’re here to help you every step of the way.',
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