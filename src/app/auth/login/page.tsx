import React from 'react'
import LoginComp from '@/components/Login'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
};
const LoginPage = () => {
  return (
    <>
    <LoginComp />
    </>
  )
}

export default LoginPage