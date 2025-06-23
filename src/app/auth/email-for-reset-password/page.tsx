import React from 'react'
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Email For Reset Password",
  description:
    'Forgot your password? Enter your email to receive a secure link and reset your UneComp account password quickly and safely.',
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
