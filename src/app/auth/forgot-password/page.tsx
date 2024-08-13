import React, { Suspense } from 'react'
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Forgot Password",
  };
  import ForgotPassword from '@/components/ForgotPassword'
const ForgotPasswordPage = () => {
  return (
  <>
<Suspense fallback={<div>Loading...</div>}>
      <ForgotPassword />
    </Suspense>
  </>
  )
}

export default ForgotPasswordPage
