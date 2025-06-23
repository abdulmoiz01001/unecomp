import React from 'react'
import LoginComp from '@/components/Login'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description:
    'Access your UneComp account to view orders, track shipments, and manage your profile. Fast and secure login for all registered users.',
};
const LoginPage = () => {
  return (
    <>
    <LoginComp />
    </>
  )
}

export default LoginPage