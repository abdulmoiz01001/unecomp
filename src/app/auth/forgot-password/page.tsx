import React from 'react'
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Forgot Password",
  };
  import ForgotPassword from '@/components/ForgotPassword'
const ForgotPasswordPage = () => {
  return (
  <>
  <ForgotPassword />
  </>
  )
}

export default ForgotPasswordPage
