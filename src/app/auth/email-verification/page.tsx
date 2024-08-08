
import EmailTemplate  from '@/components/EmailTemplate'
import React , {Suspense} from 'react'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Email Verification",
};
const EmailVerificationPage = () => {

  
  return (
    <>
     <Suspense fallback={<div>Loading...</div>}>
    <EmailTemplate/>
     </Suspense>
    </>
  )
}

export default EmailVerificationPage