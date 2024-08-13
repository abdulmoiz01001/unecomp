import React from 'react'
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Email For Reset Password",
  };
  import EmailForForgotPassword from '@/components/EmailForForgotPassword'
const EmailForResetPasswordPage = () => {
  return (
  <>
   <EmailForForgotPassword />
  </>
  )
}

export default EmailForResetPasswordPage
